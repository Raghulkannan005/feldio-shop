import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productService from '../../services/productService';
import Loading from '../common/Loading';

const ProductList = ({ category = '', searchTerm = '', sortBy = 'newest' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Build filter object based on props
        const filters = {};
        if (category && category !== 'all') {
          filters.category = category;
        }
        if (searchTerm) {
          filters.search = searchTerm;
        }
        if (sortBy) {
          filters.sort = sortBy;
        }

        const data = await productService.getProducts(filters);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchTerm, sortBy]);

  if (loading) return <Loading />;
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }
  
  if (!products?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;