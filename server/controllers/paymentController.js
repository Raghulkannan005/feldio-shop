import Order from '../models/orderModel.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/**
 * Create a new Razorpay order
 * @route POST /api/payments/create-order
 */
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', items, shippingAddress } = req.body;
    
    // Validate required fields
    if (!amount || !items?.length || !shippingAddress) {
      return res.status(400).json({ 
        message: 'Amount, items and shipping address are required' 
      });
    }
    
    // Create Razorpay order
    const options = {
      amount,
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,  // Auto-capture payment
    };
    
    const response = await razorpay.orders.create(options);
    
    // Create order in database with pending payment status
    const order = await Order.create({
      user: req.user._id,
      items: items.map(item => ({
        product: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress,
      totalPrice: amount / 100, // Convert back from paise to rupees
      paymentMethod: 'razorpay',
      paymentStatus: 'pending',
      razorpayOrderId: response.id,
    });
    
    return res.status(200).json({
      success: true,
      orderId: response.id,
      amount: response.amount,
      dbOrderId: order._id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

/**
 * Verify Razorpay payment
 * @route POST /api/payments/verify
 */
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    
    // Validate required fields
    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({ 
        message: 'OrderId, paymentId, and signature are required' 
      });
    }
    
    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(orderId + '|' + paymentId)
      .digest('hex');
    
    if (generated_signature !== signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
    
    // Update order status
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: orderId },
      { 
        paymentStatus: 'completed',
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        isPaid: true,
        paidAt: Date.now(),
      },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      orderId: order._id,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
};

/**
 * Get Razorpay key for client
 * @route GET /api/payments/get-razorpay-key
 */
export const getRazorpayKey = (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  });
};