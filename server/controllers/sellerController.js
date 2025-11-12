import User from "../models/User.js";
import Seller from "../models/Seller.js";
import Product from "../models/Product.js";
import Rental from "../models/Rental.js";
import {getToken} from "../config/pesapal.js";
import { use } from "react";
import axios from "axios";


{/* export const registerSeller = async(req, res)=>{
    try {
        const {businessName, whatsappNumber, location} = req.body;
        const user = req.user._id;

        //check if user is already registered
        const seller = await Seller.findOne({user});

        if (seller) {
            return res.json({success: false, message: "Hotel Already Registered!"});
        }

        await Seller.create({businessName, whatsappNumber, location, user});
        await User.findByIdAndUpdate(user, {role: "seller"});

        res.json({success: true, message: "Hotel registered successfully!"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
} */}


export const registerSeller = async(req, res)=>{
    try {
        const {businessName, whatsappNumber, location} = req.body;
        const isSeller = req.user._id;
        const employerImage = req.user.image;
        

        //check if user is already registered
        const existingSeller = await Seller.findOne({ clerkUser: isSeller });

        if (existingSeller) {
        return res.json({
            success: false,
            message: "Employer already exists!",
        });
        }

        await Seller.create({
            businessName,
            location,
            whatsappNumber,
            clerkUser: req.user._id,
            profileImage: employerImage,
            premium: false
        });

        await User.findByIdAndUpdate(isSeller, {role: "seller"});

        res.json({success: true, message: "Seller successfully registered!"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const fetchSellerProfile = async (req, res) => {
  try {
    // 1. Find seller account for logged in user
    const seller = await Seller.findOne({ clerkUser: req.auth.userId })
      .populate("followers", "username email image") // populate followers (optional)
      .lean();

    if (!seller) {
      return res.json({ success: false, message: "Seller account not found!" });
    }

    // 2. Fetch the actual User linked to this seller
    const user = await User.findById(seller.clerkUser).select("username email image role");

    // 3. Merge user info into seller profile
    const sellerProfile = {
      ...seller,
      user, // nested user object
    };

    res.json({ success: true, seller: sellerProfile });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const fetchSellerDashboard = async (req, res) => {
  try {
    // 1. Find seller for logged-in user
    const seller = await Seller.findOne({ clerkUser: req.auth().userId });
    if (!seller) {
      return res.json({ success: false, message: "Seller account not found!" });
    }

    // 2. Fetch products owned by this seller
    const products = await Product.find({ seller: seller._id });

    // 3. Fetch rentals owned by this seller
    const rentals = await Rental.find({ owner: seller._id });

    // 4. Return dashboard data
    res.json({
      success: true,
      dashboard: {
        seller,
        products,
        rentals
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const deleteSellerAccount = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    const isSeller = req.user._id;

    const existingSeller = await Seller.findOne({ clerkUser: isSeller });

    if(!existingSeller){
      return res.json({success: false, message: "seller account not found"})
    }

    await Seller.findByIdAndDelete(seller);
    await User.findByIdAndUpdate(isSeller, {role: "buyer"});

    res.json({success: true, message: "Seller account deleted"});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getAllSellers = async(req, res)=>{
  try{
    const sellers = await Seller.find().sort({ createdAt: -1 });

    res.json({success: true, sellers});
  } catch(error){
    res.json({success: false, message: "internal server error"});
  }
}




export const registerIPN = async (req, res) => {
  try {
    const token = await getToken();

    const response = await axios.post(
      "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN",
      {
        url: "https://embuni-marketplace.onrender.com/api/seller/ipn", // must be public + https
        ipn_notification_type: "POST", // Pesapal recommends POST
      },
      {
        headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
       },
      }
    );

    console.log("IPN Response:", response.data);
    res.json({success: true, message: response.data}); // contains notification_id
  } catch (err) {
    console.error("IPN error:", err.response?.data || err.message);
    res.status(500).json({success: false, error: err.response?.data || err.message });
  }
};





export const goPremium = async(req, res)=>{

  const { userId } = req.auth;
  const user = await User.findById(userId);
  const seller = await Seller.findOne({ clerkUser: userId });

  try{
    const { sellerId } = req.body;
    const token = await getToken();

    const orderDetails = {
      id: `${sellerId}-${Date.now()}`,   // use sellerId as orderId (easier to track)
      currency: "KES",
      amount: 10,   // premium subscription price
      description: "Embuni Premium Seller Subscription",
      callback_url: "https://embuni-marketplace.vercel.app/sell/premium",
      notification_id: "1aca9402-c898-4333-a759-db64409450f1",
      billing_address: {
        email_address: user.email,
        country_code: "KE",
        first_name: user.username.slice(0, user.username.indexOf(' ')) || user.username,
        last_name: user.username.slice(user.username.indexOf(' ') + 1) || user.username,
        phone_number: seller.whatsappNumber || "0700000000",
      },
    };

    const response = await axios.post(
      "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest", 
      orderDetails,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json({success: true, message: response.data});
  } catch(error){
    res.json({success: false, message: error.message});
  }
}



export const premiumCallBack = async (req, res) => {
  try {
    console.log("Pesapal callback:", req.body);

    const { OrderTrackingId, OrderMerchantReference } = req.body; 

    const token = await getToken();

    // Confirm payment status
    const statusRes = await axios.get(
      `https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (statusRes.data.status === "COMPLETED") {
      await Seller.findByIdAndUpdate(OrderMerchantReference, { premium: true });
      console.log(`✅ Seller ${OrderMerchantReference} upgraded to premium`);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Callback error:", err.response?.data || err.message);
    res.sendStatus(500);
  }
}
