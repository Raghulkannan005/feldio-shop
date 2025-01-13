import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-red-600 font-bold mt-2">{product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;