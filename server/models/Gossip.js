import mongoose from 'mongoose'

const gossipSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{type: String, required: true}],
    category: {type: String, required: true},
    author: { type: String, required: true , ref: 'User'},
    likes: [{type: String, ref: 'User'}],
}, {timestamps: true})

const Gossip = mongoose.model('Gossip', gossipSchema);

export default Gossip;