const express = require('express');
const {
  placeOrder,
  getOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, placeOrder);

router.route('/:id')
  .get(protect, getOrder)
  .put(protect, admin, updateOrderStatus);

module.exports = router;