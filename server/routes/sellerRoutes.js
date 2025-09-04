import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { deleteSellerAccount, fetchSellerDashboard, fetchSellerProfile, getAllSellers, registerSeller, goPremium, premiumCallBack, registerIPN } from '../controllers/sellerController.js';
import { requireAuth } from '@clerk/express';

const sellerRouter = express.Router();

sellerRouter.post('/register', protect, registerSeller);
sellerRouter.get('/profile', requireAuth(), fetchSellerProfile);
sellerRouter.get('/dashboard', protect, fetchSellerDashboard);
sellerRouter.delete('/delete/:id', protect, deleteSellerAccount);
sellerRouter.get('/all', getAllSellers);
sellerRouter.post('/premium', protect, goPremium);
sellerRouter.post('/premium/callback', premiumCallBack);
sellerRouter.post('/register-ipn', registerIPN);
sellerRouter.post('/ipn', async (req, res) => {
  try {
    console.log("Received IPN from Pesapal:", req.body);
    // handle IPN here (e.g., verify, update DB, etc.)
    res.sendStatus(200);
  } catch (err) {
    console.error("IPN handling error:", err.message);
    res.sendStatus(500);
  }
});



export default sellerRouter;