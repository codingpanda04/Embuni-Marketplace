import express from "express";
import { addToFavorites, deleteFavorite, fetchFavorites } from "../controllers/favoritesController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireAuth } from '@clerk/express';


const favoriteRouter = express.Router();

favoriteRouter.post('/add/:productId', requireAuth(), addToFavorites);
favoriteRouter.get('/mine', fetchFavorites);
favoriteRouter.delete('/delete/:id', deleteFavorite);


export default favoriteRouter;