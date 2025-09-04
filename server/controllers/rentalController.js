import Seller from "../models/Seller.js";
import { v2 as cloudinary } from 'cloudinary';
import Rental from "../models/Rental.js";

export const createRental = async (req, res)=>{
    try {
        const {name, location, roomType, pricePerMonth, amenities} = req.body;
        const owner = await Seller.findOne({clerkUser: req.auth.userId});

        if(!owner){
            return res.json({success: false, message: "Seller account not found!"});
        }
        //upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return  response.secure_url;
        })

        //wait for images upload to complete
        const images = await Promise.all(uploadImages);

        //push data to mongo db
        await Rental.create({
            name: name,
            location: location,
            roomType: roomType,
            pricePerMonth: +pricePerMonth,
            owner: owner._id,
            amenities: JSON.parse(amenities),
            images,
            featured: false
        })

        res.json({success: true, message: "Rental created successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const deleteRental = async (req, res) => {
  try {
    const seller = await Seller.findOne({ clerkUser: req.auth.userId });
    if (!seller) {
      return res.json({ success: false, message: "Seller account not found!" });
    }

    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.json({ success: false, message: "rental not found!" });
    }

    if (rental.owner.toString() !== seller._id.toString()) {
      return res.json({ success: false, message: "unauthorized: 403" });
    }


    await Rental.findByIdAndDelete(rental._id);

    res.json({ success: true, message: "Rental deleted successfully." });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




export const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().populate("owner", "businessName whatsappNumber proleImage followers");
    res.json({ success: true, rentals });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getSellerRentals = async (req, res) => {
  try {
    const seller = await Seller.findOne({ clerkUser: req.auth.userId });
    if (!seller) {
      return res.json({ success: false, message: "Seller account not found!" });
    }

    const rentals = await Rental.find({ owner: seller._id });
    res.json({ success: true, rentals });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
