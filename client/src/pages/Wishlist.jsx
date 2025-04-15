import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowLeft, FaHeart, FaCartPlus } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(CartContext);

  const handleRemove = (id) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Show a toast notification
    alert(`${product.name} added to cart!`);
  };

  if (!wishlistItems.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaHeart className="mx-auto text-5xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Discover products and add them to your wishlist for easy access later.</p>
          <Link to="/products">
            <motion.button 
              className="bg-red-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft /> Explore Products
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
          Your Wishlist
        </motion.h1>
        
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div 
                key={item._id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                  <button 
                    onClick={() => handleRemove(item._id)} 
                    className="absolute top-2 right-2 bg-white/80 text-red-500 p-2 rounded-full hover:bg-white"
                  >
                    <FaTrash />
                  </button>
                </div>
                
                <div className="p-4">
                  <Link to={`/products/${item._id}`}>
                    <h3 className="text-lg font-medium hover:text-red-600 transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-red-600 font-semibold mt-2">₹{item.price}</p>
                  
                  <motion.button 
                    onClick={() => handleAddToCart(item)}
                    className="mt-4 w-full bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaCartPlus /> Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8">
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
      </div>
    </div>
  );
};

export default Wishlist;