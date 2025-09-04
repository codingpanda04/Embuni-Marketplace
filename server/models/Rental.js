import mongoose from "mongoose";

const rentalSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: {type: String, required: true},
    owner: {type: String, required: true, ref: 'Seller'},
    images: [{type: String, required: true}],
    pricePerMonth: {type: Number, required: true},
    amenities: {type: Array, required: true},
    roomType: {type: String, required: true},
    featured: {type: Boolean, default: false}
}, {timestamps: true});

const Rental = mongoose.model('Rental', rentalSchema);

export default Rental;