
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

const Wishlist = () => {

  const handleRemove = (id) => {
    // Logic to remove item from wishlist
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Your Wishlist</h2>
        <div className="space-y-4">
          {wishlistItems.map(item => (
            <motion.div 
              key={item.id}
              className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: item.id * 0.2 }}
            >
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg" />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600">{item.price}</div>
              </div>
              <button 
                onClick={() => handleRemove(item.id)} 
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Wishlist;