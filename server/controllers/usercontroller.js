import User from "../models/User.js";
import Seller from "../models/Seller.js";

export const getUser = async (req, res)=>{
    try {
        const user = req.user;
        const role = req.user.role;
        const following = req.user.following || [];
        const admin = req.user.admin;
        res.json({success: true, role, following, admin})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}



export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by their Clerk ID (_id is string)
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let responseData = { user };

    // If role is seller, fetch seller profile
    if (user.role === "seller") {
      const sellerProfile = await Seller.findOne({ clerkUser: user._id })
        .populate("followers", "_id username image"); // populate followers if needed

      if (sellerProfile) {
        responseData.sellerProfile = sellerProfile;
      }
    }

    res.status(200).json({
      success: true,
      ...responseData,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


