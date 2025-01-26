const express = require('express');

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(addProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(deleteProduct);

module.exports = router;