import express from 'express';
import { createOrder, verifyPayment, getRazorpayKey } from '../controllers/paymentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes requiring authentication
router.use(protect);

// Create a new Razorpay order
router.post('/create-order', createOrder);

// Verify Razorpay payment
router.post('/verify', verifyPayment);

// Get Razorpay key
router.get('/get-razorpay-key', getRazorpayKey);

export default router;