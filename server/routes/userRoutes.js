import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUser, getUserById } from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUser);
userRouter.get("/:id", getUserById);

// Export the router                

export default userRouter;