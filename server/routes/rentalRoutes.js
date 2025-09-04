import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRental } from "../controllers/rentalController.js";
import upload from "../middleware/uploadMiddleware.js";
import { getAllRentals, getSellerRentals } from "../controllers/rentalController.js";
import { deleteRental } from "../controllers/rentalController.js";

const rentalRouter = express.Router();

rentalRouter.post('/create', protect, upload.array('images', 4), createRental);
rentalRouter.get('/all', getAllRentals);
rentalRouter.get('/seller', protect, getSellerRentals);
rentalRouter.delete('/delete/:id', protect, deleteRental);


export default rentalRouter;