import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true},
    role: {type: String, enum: ["buyer", "seller", "admin"], default: "buyer"},
    following: {type: Array}
},{timestamps: true}
)

const User = mongoose.model("User", userSchema);

export default User;