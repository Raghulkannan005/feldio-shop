import api from './api';

const paymentService = {
  // Create payment order with Razorpay
  createPaymentOrder: async (amount) => {
    try {
      const response = await api.post('/payments/razorpay/create-order', { amount });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to create payment order';
    }
  },

  // Verify payment after successful Razorpay transaction
  verifyPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/razorpay/verify', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Payment verification failed';
    }
  },
  
  // Get payment history for the current user
  getPaymentHistory: async () => {
    try {
      const response = await api.get('/payments/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to fetch payment history';
    }
  },

  // Process a refund
  processRefund: async (paymentId, amount) => {
    try {
      const response = await api.post('/payments/refund', { paymentId, amount });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to process refund';
    }
  },
};

export default paymentService;