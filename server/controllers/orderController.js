import Order from '../models/orderModel.js';

export const placeOrder = async (req, res) => {
  const { products, totalPrice } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Products are required and should not be empty' });
  }

  if (!totalPrice || typeof totalPrice !== 'number' || totalPrice <= 0) {
    return res.status(400).json({ message: 'Total price is required and should be a positive number' });
  }

  try {
    const order = new Order({
      user: req.user.id,
      products,
      totalPrice,
      status: 'Pending',
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status || order.status;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};