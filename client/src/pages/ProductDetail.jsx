import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import productService from '../services/productService';
import { CartContext } from '../context/CartContext';
import Loading from '../components/common/Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, addToWishlist } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProduct(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      // Show toast/notification (could be implemented separately)
      alert('Product added to cart');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      // Navigate to checkout (replace with proper routing when react-router is fully integrated)
      window.location.href = '/checkout';
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded">
          <h1 className="text-xl font-bold">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex items-center justify-center">
      <motion.div 
        className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2 p-6 md:pl-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-4 text-lg">{product.description}</p>
            <p className="text-2xl font-bold text-red-600 mt-6">₹{product.price}</p>
            
            <div className="mt-4 flex items-center">
              <span className="text-gray-700 mr-2">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">{product.stock} in stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of stock</span>
              )}
            </div>
            
            <div className="mt-4">
              <span className="text-gray-700 mr-2">Category:</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{product.category}</span>
            </div>
            
            <div className="mt-8 space-y-4">
              <motion.button 
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </motion.button>
              <motion.button 
                className="w-full border-2 border-red-600 text-red-600 py-3 px-6 rounded-lg hover:bg-red-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;