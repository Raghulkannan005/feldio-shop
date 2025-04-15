import express from 'express';
import {
  placeOrder,
  getOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import protect from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, placeOrder);

router.route('/:id')
  .get(protect, getOrder)
  .put(protect, admin, updateOrderStatus);

export default router;