import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: [{type: String, required: true}],
    category: {type: String, required: true},
    price: { type: Number, required: true },
    inStock: {type: Number, required: true, default: 0},
    seller: { type: String, required: true , ref: 'Seller'},
    featured: {type: Boolean, default: false}
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);

export default Product;