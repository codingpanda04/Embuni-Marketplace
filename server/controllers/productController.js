import Seller from "../models/Seller.js";
import { v2 as cloudinary } from 'cloudinary';
import Product from "../models/Product.js";

export const createProduct = async (req, res)=>{
    try {
        const {productName, productDescription, inStock, price, location, category} = req.body;
        const seller = await Seller.findOne({clerkUser: req.auth.userId});

        if(!seller){
            return res.json({success: false, message: "Seller account not found!"});
        }
        //upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        //wait for images upload to complete
        const images = await Promise.all(uploadImages);

        //push data to mongo db
        await Product.create({
            name: productName,
            location,
            description: productDescription,
            inStock: +inStock,
            seller: seller._id,
            images,
            price: +price,
            category: JSON.parse(category),
            featured: false
        })

        res.json({success: true, message: "Product created successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const deleteProduct = async (req, res) => {
  try {
    const seller = await Seller.findOne({ clerkUser: req.auth.userId });
    if (!seller) {
      return res.json({ success: false, message: "Seller account not found!" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ success: false, message: "Product not found!" });
    }

    if (product.seller.toString() !== seller._id.toString()) {
      return res.json({ success: false, message: "Unauthorized: You cannot delete this product." });
    }

    await Product.findByIdAndDelete(product._id);

    res.json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "businessName whatsappNumber proleImage followers");
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getSellerProducts = async (req, res) => {
  try {
    const seller = await Seller.findOne({ clerkUser: req.auth.userId });
    if (!seller) {
      return res.json({ success: false, message: "Seller account not found!" });
    }

    const products = await Product.find({ seller: seller._id });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
