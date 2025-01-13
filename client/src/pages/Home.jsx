import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { dummyProducts } from '../constants';
import ProductCard from '../components/product/ProductCard';
import { FaSearch, FaThList, FaThLarge, FaFilter, FaShippingFast, FaHeadset, FaShieldAlt } from 'react-icons/fa';
import ParticlesBg from 'particles-bg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  // Categories with icons and stats
  const categories = [
    { id: 'tech', name: 'Technology', icon: '🚀', count: 10 },
    { id: 'lifestyle', name: 'Lifestyle', icon: '✨', count: 16 },
    { id: 'accessories', name: 'Accessories', icon: '🎮', count: 12 },
    { id: 'wellness', name: 'Wellness', icon: '🌿', count: 18 }
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 8400);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format countdown time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Hero Section with Particles Background */}
      <section className="relative h-[90vh] overflow-hidden">
        <ParticlesBg type="cobweb" bg={true} />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="lg:w-1/2 text-white"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Welcome to
                <span className="text-yellow-400"> Feldio Shop </span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Your one-stop destination for the latest and greatest products
              </p>
              
              {/* Search Bar with Autocomplete */}
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search amazing products..."
                  className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
              </div>
            </motion.div>

            {/* Featured Product Carousel */}
            <motion.div 
              className="lg:w-1/2 mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Swiper
                effect="cards"
                grabCursor={true}
                className="w-full max-w-md"
              >
                {dummyProducts.slice(0, 5).map(product => (
                  <SwiperSlide key={product._id}>
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-red-600 font-bold mt-2">{product.price}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>
        </div>

        {/* Floating Stats */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-8 py-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex space-x-12 text-white text-center">
            <div>
              <div className="text-2xl font-bold">90+</div>
              <div className="text-sm">Products</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1200+</div>
              <div className="text-sm">Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm">Rating</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Deal of the Day */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-red-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Deal of the Day</h2>
              <div className="text-2xl font-mono text-red-600">{formatTime(timeLeft)}</div>
            </motion.div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className={`p-6 rounded-xl cursor-pointer relative overflow-hidden
                  ${activeCategory === category.id ? 'bg-gradient-to-r from-red-500 to-red-700 text-white' : 'bg-white'}`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm opacity-75">{category.count} Products</p>
              </motion.div>
            ))}
          </div>

          {/* Products Section */}
          <div className="mb-8 flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gradient-to-r from-red-500 to-red-700 text-white' : 'bg-gray-100'}`}
              >
                <FaThLarge />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gradient-to-r from-red-500 to-red-700 text-white' : 'bg-gray-100'}`}
              >
                <FaThList />
              </button>
              <select 
                className="p-2 rounded bg-white border"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded bg-gradient-to-r from-red-500 to-red-700 text-white flex items-center space-x-2"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>

          {/* Product Grid/List */}
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {dummyProducts.map(product => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 text-center bg-white rounded-lg shadow-lg"
            >
              <FaShippingFast className="text-4xl text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Free shipping on orders above ₹999</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 text-center bg-white rounded-lg shadow-lg"
            >
              <FaHeadset className="text-4xl text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round the clock assistance</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 text-center bg-white rounded-lg shadow-lg"
            >
              <FaShieldAlt className="text-4xl text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple payment options</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8">Subscribe to get notified about product launches, special offers and news</p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;