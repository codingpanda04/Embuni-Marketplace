// controllers/favoriteController.js
import Favorite from "../models/Favorite.js";

export const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.auth.userId; // assuming you have Clerk auth middleware attaching req.user

    // Check if already exists
    const existingFavorite = await Favorite.findOne({
      product: productId,
    });

    if (existingFavorite) {
      return res.status(400).json({success: false, message: "Product already in favorites" });
    }

    await Favorite.create({
      user: userId,
      product: productId,
    });

    res.status(201).json({
      success: true,
      message: "Product added to favorites"
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({success: false, message: error.message });
  }
};



export const fetchFavorites = async (req, res) => {
  try {
    const userId = req.auth.userId; // Clerk user id attached by auth middleware

    const favorites = await Favorite.find({ user: userId })
      .populate({
        path: "product",
        select: "name description price images seller", // only fields you need
        populate: {
          path: "seller",
          model: "Seller",
          select: "businessName location whatsappNumber profileImage", // only essentials
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({success: false, message: "Server error" });
  }
};


export const deleteFavorite = async (req, res) => {
  try {
    const userId = req.auth.userId; // Clerk user id from auth middleware
    const { favoriteId } = req.params;

    // Ensure the favorite belongs to the logged-in user
    const favorite = await Favorite.findOneAndDelete({
      _id: favoriteId,
      user: userId,
    });

    if (!favorite) {
      return res.status(404).json({success: false, message: "Favorite not found" });
    }

    res.status(200).json({success: true, message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({success: false, message: "Server error" });
  }
};