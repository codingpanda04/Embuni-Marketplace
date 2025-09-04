import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    businessName: {type: String, required: true},
    location: {type: String, required: true},
    whatsappNumber: {type: String, required: true},
    clerkUser: {type: String, required: true, ref: "User"},
    profileImage: {type: String, required: true},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    premium: {type: Boolean, default: false}
}, {timestamps: true});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;