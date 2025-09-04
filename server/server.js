import 'dotenv/config'
import express from 'express'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import connectDB from "./config/db.js";
import connectCloudinary from './config/cloudinary.js'
// import { functions, inngest } from './inngest/index.js'
// import { serve } from 'inngest/express'
import clerkWebhook from './controllers/clerkwebhook.js'
import userRouter from './routes/userRoutes.js'
import sellerRouter from './routes/sellerRoutes.js' 
import productRouter from './routes/productRouter.js';
import rentalRouter from './routes/rentalRoutes.js';
import gossipRouter from './routes/gossipRoutes.js';
import favoriteRouter from './routes/favoriteRoutes.js';


await connectCloudinary();
const app = express()

// Middleware
app.use(express.json())
app.use(cors({/*{
  origin: ['https://embuni-marketplace.vercel.app', 'https://embuni-marketplace.com', 'https://www.embuni-marketplace.com', 'http://localhost:5173/'],
  credentials: true,
}*/}))
app.use(clerkMiddleware());

// Webhook endpoint
app.use('/api/clerk', clerkWebhook)

// API routes
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/products', productRouter)
app.use('/api/rentals', rentalRouter)
app.use('/api/gossip', gossipRouter)
app.use('/api/favorites', favoriteRouter)

// Healthcheck
app.get("/", (req, res) => {
  res.send("Server is running");
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
  })
})
