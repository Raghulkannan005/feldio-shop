/**
 * Service for managing orders
 */
import api from './api';

const orderService = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data with items, shipping address, payment method
   * @returns {Promise<Object>} - Created order
   */
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to create order';
    }
  },

  /**
   * Get all orders for current user
   * @returns {Promise<Array>} - List of orders
   */
  getUserOrders: async () => {
    try {
      const response = await api.get('/orders/my-orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to fetch orders';
    }
  },

  /**
   * Track order by ID or tracking number
   * @param {string} orderId - Order ID or tracking number
   * @returns {Promise<Object>} - Order tracking details
   */
  trackOrder: async (orderId) => {
    try {
      const response = await api.get(`/orders/track/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Order not found';
    }
  },

  /**
   * Cancel order
   * @param {string} orderId - Order ID to cancel
   * @returns {Promise<Object>} - Updated order with cancelled status
   */
  cancelOrder: async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to cancel order';
    }
  },

  /**
   * Get all orders (for admin)
   * @param {Object} filters - Filters for orders (status, page, limit)
   * @returns {Promise<Array>} - List of orders
   */
  getAllOrders: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);
      
      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await api.get(`/orders${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to fetch orders';
    }
  },

  /**
   * Update order status (for admin)
   * @param {string} orderId - Order ID
   * @param {string} status - New status for the order
   * @returns {Promise<Object>} - Updated order
   */
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to update order status';
    }
  },
};

export default orderService;