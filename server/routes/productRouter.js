import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, getSellerProducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post('/create', protect, upload.array('images', 4), createProduct);
productRouter.delete('/delete/:id', protect, deleteProduct);
productRouter.get('/all', getAllProducts);
productRouter.get('/seller', protect, getSellerProducts);


export default productRouter;