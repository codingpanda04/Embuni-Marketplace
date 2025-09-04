// models/Favorite.js
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    user: {type: String, ref: "User", required: true},
    product: {type: String, ref: "Product", required: true},
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
