import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import Loading from '../components/common/Loading';
import productService from '../services/productService';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  });
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  // Fetch products on component mount and when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Build query params for filtering
        const params = new URLSearchParams();
        if (selectedCategory) params.append('category', selectedCategory);
        if (priceRange.min) params.append('minPrice', priceRange.min);
        if (priceRange.max) params.append('maxPrice', priceRange.max);
        if (sortBy) params.append('sort', sortBy);
        if (searchQuery) params.append('query', searchQuery);
        
        // Update URL with current filters
        setSearchParams(params);
        
        // Fetch filtered products
        const data = await productService.getProducts(Object.fromEntries(params));
        setProducts(data);
        
        // Extract unique categories for filter
        if (!categories.length) {
          const allCategories = await productService.getCategories();
          setCategories(allCategories);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory, sortBy, searchParams.toString()]);
  
  // Apply filters and update URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory);
    if (priceRange.min) params.append('minPrice', priceRange.min);
    if (priceRange.max) params.append('maxPrice', priceRange.max);
    if (sortBy) params.append('sort', sortBy);
    if (searchQuery) params.append('query', searchQuery);
    setSearchParams(params);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSearchQuery('');
    setSortBy('newest');
    setSearchParams({});
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600 mb-8">Find the perfect product for you</p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filters */}
          <motion.div
            className="md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Search</h2>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Search products..."
                />
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Categories</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="all-categories"
                    name="category"
                    type="radio"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <label htmlFor="all-categories" className="ml-3 text-sm text-gray-700">
                    All Categories
                  </label>
                </div>
                
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-700 capitalize">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Price Range</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
                    Min Price (₹)
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="0"
                  />
                </div>
                
                <div>
                  <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
                    Max Price (₹)
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={applyFilters}
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Apply Filters
              </button>
              
              <button
                onClick={clearFilters}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
          
          {/* Products content */}
          <motion.div
            className="md:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Sort and results count */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-3 sm:mb-0">
                <span className="text-gray-600">
                  {products.length} {products.length === 1 ? 'product' : 'products'} found
                </span>
              </div>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            {/* Product grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <Loading />
              </div>
            ) : error ? (
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Try Again
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-gray-50 p-16 rounded-lg text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <ProductList products={products} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;