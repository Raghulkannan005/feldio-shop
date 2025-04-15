import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// Create Express app
const app = express();

// Apply middleware
app.use(express.json());

// Configure CORS properly
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://feldio.shop', 'https://www.feldio.shop'] 
    : ['http://localhost:5173'],
  credentials: true
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'DENY');
  // Add Strict-Transport-Security in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// Validate Razorpay credentials in production (uncommented the validation)
if (process.env.NODE_ENV === 'production' && (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET)) {
  console.error('Razorpay key_id and key_secret are mandatory for production environment');
  process.exit(1);
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then((data) => {
    console.log('Connected to MongoDB:', data.connection.name);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Terminate if DB connection fails
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Error handling for non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Uncaught error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    // Don't expose error details in production
    ...(process.env.NODE_ENV !== 'production' ? { error: err.message } : {})
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't crash in production, but log the error
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});