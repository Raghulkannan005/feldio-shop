import { motion } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import { dummyProducts } from '../constants';
import Marquee from '../components/common/Marquee';
import Header from '../components/common/Header';

const Home = () => {
  return (
    <div>
      <Marquee />
      <Header />
      <motion.section 
        className="hero py-20 bg-blue-500 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Feldio Shop
          </h1>
          <p className="text-xl mb-8">
            Discover amazing products at great prices
          </p>
          <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition duration-300">
            Shop Now
          </button>
        </div>
      </motion.section>
      
      <motion.section 
        className="py-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dummyProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;