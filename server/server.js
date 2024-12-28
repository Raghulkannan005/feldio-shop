const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Product = require('./models/productModel');
// const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
//   console.error('Razorpay key_id and key_secret are mandatory');
//   process.exit(1);
// }

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    addInitialProduct(); // Add initial product
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const addInitialProduct = async () => {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const initialProduct = new Product({
      name: 'Sample Product',
      description: 'This is a sample product',
      price: 100,
      stock: 10,
      category: 'Sample Category',
      images: ['https://via.placeholder.com/150'],
    });
    await initialProduct.save();
    console.log('Initial product added');
  }
};

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});