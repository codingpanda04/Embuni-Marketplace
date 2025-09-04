import Gossip from "../models/Gossip.js";
import { v2 as cloudinary } from 'cloudinary';

export const createGossip = async (req, res)=>{
    try {
        const {title, description,category} = req.body;
        const author = req.auth().userId;

        //upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        //wait for images upload to complete
        const images = await Promise.all(uploadImages);

        //push data to mongo db
        await Gossip.create({
            title,
            description,
            category: JSON.parse(category),
            author,
            images,
            likes: []
        })

        res.json({success: true, message: "Gossip created successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const likeGossip = async (req, res) => {
    try {
        const gossipId = req.params.id;
        const userId = req.auth().userId;
        const gossip = await Gossip.findById(gossipId);

        if(!gossip){
            return res.status(404).json({success: false, message: "Gossip not found"});
        }

        const liked = await Gossip.findById(gossipId).then(gossip => {
            if(gossip.likes.includes(userId)){
                return "Gossip already liked";
            }
        });
        if(liked){
            return res.json({success: false, message: liked});
        }
        await Gossip.findByIdAndUpdate(gossipId, {
            $addToSet: {likes: userId}
        }, {new: true});

        res.json({success: true, message: liked})
    } catch(error) {
        res.json({success: false, message: error.message});
    }
}

export const unlikeGossip = async (req, res) => {
    try {
        const gossipId = req.params.id;
        const userId = req.auth().userId;

        const gossip = await Gossip.findById(gossipId);
        if(!gossip){
            return res.status(404).json({success: false, message: "Gossip not found"});
        }

        const unliked = await Gossip.findById(gossipId).then(gossip => {
            if(!gossip.likes.includes(userId)){
                return "Gossip not liked yet";
            }
        });
        if(unliked){
            return res.json({success: false, message: unliked});
        }

        await Gossip.findByIdAndUpdate(gossipId, {
            $pull: {likes: userId}
        }, {new: true});

        res.json({success: true, message: "Gossip unliked"})
    } catch(error) {
        res.json({success: false, message: error.message});
    }
}

export const fetchGossips = async (req, res)=>{
    try{
        const gossips = await Gossip.find().sort({createdAt: -1});
        res.json({success: true, gossips});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteGossip = async (req, res) => {
    try {
        const gossipId = req.params.id;
        const userId = req.auth().userId;

        const gossip = await Gossip.findById(gossipId);
        if(!gossip){
            return res.status(404).json({success: false, message: "Gossip not found"});
        }

        await Gossip.findByIdAndDelete(gossipId);

        res.json({success: true, message: "Gossip deleted successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}