import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlistItems } = useContext(CartContext);
  
  if (!product) return null;

  const isInWishlist = wishlistItems.some(item => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Optional: Show toast notification
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
    // Optional: Show toast notification
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${product._id}`} className="block h-full">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <button 
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isInWishlist ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:text-red-600'
            }`}
            onClick={handleAddToWishlist}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FaHeart />
          </button>
          
          {product.stock <= 0 && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-full font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
          <p className="text-red-600 font-bold mt-2">₹{product.price}</p>
          
          {product.stock > 0 && product.stock <= 5 && (
            <p className="text-sm text-orange-500 mt-1">Only {product.stock} left in stock</p>
          )}
          
          <div className="mt-2 text-sm text-gray-500">
            Category: {product.category}
          </div>
        </div>
        
        <div className="p-4 pt-0 flex justify-between space-x-2 mt-auto">
          <motion.button 
            className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
          >
            Buy Now
          </motion.button>
          
          <motion.button 
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-900 flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            <FaShoppingCart className="mr-2" /> Add
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;