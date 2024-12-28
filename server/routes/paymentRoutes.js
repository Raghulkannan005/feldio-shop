const express = require('express');
const {
  createOrder,
  verifyPayment,
} = require('../controllers/paymentController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/create-order')
  .post(protect, createOrder);

router.route('/verify')
  .post(protect, verifyPayment);

module.exports = router;