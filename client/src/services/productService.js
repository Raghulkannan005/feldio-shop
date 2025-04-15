/**
 * Product service for product-related API calls
 */
import api from './api';

const productService = {
  /**
   * Get all products
   * @param {Object} filters - Optional filters
   * @returns {Promise<Array>} - List of products
   */
  getProducts: async (filters = {}) => {
    // Convert filters to query string if needed
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return api.get(`/products${query}`);
  },

  /**
   * Get a single product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} - Product details
   */
  getProduct: async (id) => {
    return api.get(`/products/${id}`);
  },

  /**
   * Create a new product (admin only)
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} - Created product
   */
  createProduct: async (productData) => {
    return api.post('/products', productData);
  },

  /**
   * Update an existing product (admin only)
   * @param {string} id - Product ID
   * @param {Object} productData - Updated product data
   * @returns {Promise<Object>} - Updated product
   */
  updateProduct: async (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  /**
   * Delete a product (admin only)
   * @param {string} id - Product ID
   * @returns {Promise<Object>} - Result
   */
  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`);
  }
};

export default productService;