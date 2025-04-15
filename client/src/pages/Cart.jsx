import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowLeft, FaCartPlus } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaCartPlus className="mx-auto text-5xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products">
            <motion.button 
              className="bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft /> Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Shopping Cart
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <motion.div 
            className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {cartItems.map((item, index) => (
              <motion.div 
                key={item._id}
                className="flex flex-col sm:flex-row items-center py-6 border-b border-gray-200 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-md mr-6"
                />
                
                <div className="flex-1 sm:ml-4">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-red-600 font-semibold">₹{item.price}</p>
                </div>
                
                <div className="flex items-center mt-4 sm:mt-0">
                  <div className="flex items-center border border-gray-300 rounded mr-4">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="px-3 py-1 border-r border-gray-300"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="px-3 py-1 border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemove(item._id)} 
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
            
            <div className="mt-6">
              <Link to="/products">
                <motion.button
                  className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                  whileHover={{ x: -5 }}
                >
                  <FaArrowLeft className="mr-2" /> Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          {/* Order Summary */}
          <motion.div 
            className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{totalPrice > 999 ? 'Free' : '₹100.00'}</span>
              </div>
              
              <div className="border-t border-b py-3 my-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{(totalPrice > 999 ? totalPrice : totalPrice + 100).toFixed(2)}</span>
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {totalPrice > 999 ? 'Free shipping applied' : `₹${(999 - totalPrice).toFixed(2)} away from free shipping`}
                </div>
              </div>
            </div>
            
            <Link to="/checkout">
              <motion.button 
                className="w-full bg-red-600 text-white py-3 rounded-lg mt-4 font-medium hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;