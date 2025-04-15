/**
 * API service module for centralized API calls
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Generic error handler for API calls
 * @param {Response} response - Fetch API response
 * @returns {Promise} - JSON response or error
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    // Handle HTTP errors
    const errorData = contentType && contentType.includes('application/json') 
      ? await response.json() 
      : { message: response.statusText };
    throw new Error(errorData.message || 'API request failed');
  }
  
  // Return JSON or text based on content type
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text();
};

/**
 * Generic API request method
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch API options
 * @returns {Promise} - Response data
 */
const request = async (endpoint, options = {}) => {
  try {
    const url = `${API_URL}${endpoint}`;
    
    // Add default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`API request failed: ${error.message}`);
    throw error;
  }
};

/**
 * API methods for different HTTP verbs
 */
const api = {
  get: (endpoint) => request(endpoint),
  
  post: (endpoint, data) => request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => request(endpoint, {
    method: 'DELETE',
  }),
};

export default api;