import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { createGossip, deleteGossip, fetchGossips, likeGossip, unlikeGossip } from "../controllers/gossipController.js";

const gossipRouter = express.Router();

gossipRouter.post('/create', upload.array('images', 4), createGossip);
gossipRouter.post('/like/:id', likeGossip);
gossipRouter.post('/unlike/:id', unlikeGossip);
gossipRouter.get('/all', fetchGossips);
gossipRouter.delete('/delete/:id', deleteGossip);



export default gossipRouter;