/**
 * Authentication service for auth-related API calls
 */
import api from './api';
import jwt_decode from 'jwt-decode';

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Registration result
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Login a user
   * @param {Object} credentials - User login credentials
   * @returns {Promise} - Login result
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Logout the current user
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
  },

  /**
   * Check if user is logged in
   * @returns {boolean} - True if logged in
   */
  isLoggedIn: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decoded = jwt_decode(token);
      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        authService.logout();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Invalid token:', error);
      authService.logout();
      return false;
    }
  },

  /**
   * Get the current user token
   * @returns {string|null} - JWT token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Get current user information
   * @returns {Object|null} - User object or null
   */
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  /**
   * Check if current user is admin
   * @returns {boolean} - True if user is admin
   */
  isAdmin: () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.isAdmin === true;
    } catch (error) {
        console.error("Error checking admin status:", error);
      return false;
    }
  }
};

export default authService;