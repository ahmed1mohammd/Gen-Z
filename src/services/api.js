// API Configuration and Services
// This file contains all API calls and configurations for the Gen Z e-commerce platform

import { API_CONFIG, getApiUrl, AUTH_CONFIG } from '../config/environment';
import { isMockMode } from '../config/mockMode';
// Mock API imports
import * as mockApi from './mockApi';

// API Headers configuration
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem(AUTH_CONFIG.TOKEN_KEY)}`,
  'Accept': 'application/json',
});

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  const config = {
    headers: getHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// ===========================================
// PRODUCTS API ENDPOINTS
// ===========================================

/**
 * Get all products with optional filtering
 * @param {Object} filters - Filter options (category, price_range, search, etc.)
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async (filters = {}) => {
  if (isMockMode()) {
    return mockApi.mockGetProducts(filters);
  }
  
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = `/products${queryParams ? `?${queryParams}` : ''}`;
  
  return apiRequest(endpoint);
};

/**
 * Get single product by ID
 * @param {string|number} productId - Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (productId) => {
  if (isMockMode()) {
    return mockApi.mockGetProductById(productId);
  }
  
  return apiRequest(`/products/${productId}`);
};

/**
 * Search products by query
 * @param {string} query - Search query
 * @param {Object} filters - Additional filters
 * @returns {Promise<Array>} Search results
 */
export const searchProducts = async (query, filters = {}) => {
  const searchParams = {
    q: query,
    ...filters
  };
  
  return getProducts(searchParams);
};

/**
 * Get products by category
 * @param {string} category - Product category (watches, perfumes)
 * @param {Object} filters - Additional filters
 * @returns {Promise<Array>} Category products
 */
export const getProductsByCategory = async (category, filters = {}) => {
  return getProducts({ category, ...filters });
};

/**
 * Get featured/popular products
 * @param {number} limit - Number of products to return
 * @returns {Promise<Array>} Featured products
 */
export const getFeaturedProducts = async (limit = 8) => {
  if (isMockMode()) {
    return mockApi.mockGetFeaturedProducts(limit);
  }
  
  return apiRequest(`/products/featured?limit=${limit}`);
};

/**
 * Get product reviews
 * @param {string|number} productId - Product ID
 * @returns {Promise<Array>} Product reviews
 */
export const getProductReviews = async (productId) => {
  return apiRequest(`/products/${productId}/reviews`);
};

/**
 * Add product review
 * @param {string|number} productId - Product ID
 * @param {Object} reviewData - Review data (rating, comment, etc.)
 * @returns {Promise<Object>} Created review
 */
export const addProductReview = async (productId, reviewData) => {
  return apiRequest(`/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
};

// ===========================================
// CART API ENDPOINTS
// ===========================================

/**
 * Get user's cart
 * @returns {Promise<Object>} Cart data
 */
export const getCart = async () => {
  if (isMockMode()) {
    return mockApi.mockGetCart();
  }
  
  return apiRequest('/cart');
};

/**
 * Add item to cart
 * @param {Object} itemData - Item data (product_id, quantity, etc.)
 * @returns {Promise<Object>} Updated cart
 */
export const addToCart = async (itemData) => {
  if (isMockMode()) {
    return mockApi.mockAddToCart(itemData);
  }
  
  return apiRequest('/cart/items', {
    method: 'POST',
    body: JSON.stringify(itemData),
  });
};

/**
 * Update cart item quantity
 * @param {string|number} itemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise<Object>} Updated cart
 */
export const updateCartItem = async (itemId, quantity) => {
  return apiRequest(`/cart/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
};

/**
 * Remove item from cart
 * @param {string|number} itemId - Cart item ID
 * @returns {Promise<Object>} Updated cart
 */
export const removeFromCart = async (itemId) => {
  return apiRequest(`/cart/items/${itemId}`, {
    method: 'DELETE',
  });
};

/**
 * Clear entire cart
 * @returns {Promise<Object>} Empty cart
 */
export const clearCart = async () => {
  return apiRequest('/cart', {
    method: 'DELETE',
  });
};

// ===========================================
// ORDERS API ENDPOINTS
// ===========================================

/**
 * Get user's orders
 * @param {Object} filters - Order filters (status, date_range, etc.)
 * @returns {Promise<Array>} User orders
 */
export const getOrders = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = `/orders${queryParams ? `?${queryParams}` : ''}`;
  
  return apiRequest(endpoint);
};

/**
 * Get single order by ID
 * @param {string|number} orderId - Order ID
 * @returns {Promise<Object>} Order details
 */
export const getOrderById = async (orderId) => {
  return apiRequest(`/orders/${orderId}`);
};

/**
 * Create new order
 * @param {Object} orderData - Order data (items, shipping_address, etc.)
 * @returns {Promise<Object>} Created order
 */
export const createOrder = async (orderData) => {
  return apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};

/**
 * Update order status
 * @param {string|number} orderId - Order ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated order
 */
export const updateOrderStatus = async (orderId, status) => {
  return apiRequest(`/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

// ===========================================
// USER AUTHENTICATION API ENDPOINTS
// ===========================================

/**
 * User login
 * @param {Object} credentials - Login credentials (email, password)
 * @returns {Promise<Object>} Auth token and user data
 */
export const loginUser = async (credentials) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

/**
 * User registration
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Auth token and user data
 */
export const registerUser = async (userData) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

/**
 * User logout
 * @returns {Promise<Object>} Logout confirmation
 */
export const logoutUser = async () => {
  return apiRequest('/auth/logout', {
    method: 'POST',
  });
};

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export const getCurrentUser = async () => {
  return apiRequest('/auth/me');
};

/**
 * Update user profile
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} Updated user profile
 */
export const updateUserProfile = async (profileData) => {
  return apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

/**
 * Change user password
 * @param {Object} passwordData - Password change data (current_password, new_password)
 * @returns {Promise<Object>} Password change confirmation
 */
export const changePassword = async (passwordData) => {
  return apiRequest('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwordData),
  });
};

// ===========================================
// WISHLIST API ENDPOINTS
// ===========================================

/**
 * Get user's wishlist
 * @returns {Promise<Array>} Wishlist items
 */
export const getWishlist = async () => {
  return apiRequest('/wishlist');
};

/**
 * Add item to wishlist
 * @param {string|number} productId - Product ID
 * @returns {Promise<Object>} Added wishlist item
 */
export const addToWishlist = async (productId) => {
  return apiRequest('/wishlist', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId }),
  });
};

/**
 * Remove item from wishlist
 * @param {string|number} productId - Product ID
 * @returns {Promise<Object>} Removal confirmation
 */
export const removeFromWishlist = async (productId) => {
  return apiRequest(`/wishlist/${productId}`, {
    method: 'DELETE',
  });
};

// ===========================================
// PAYMENT API ENDPOINTS
// ===========================================

/**
 * Process payment
 * @param {Object} paymentData - Payment data (amount, payment_method, etc.)
 * @returns {Promise<Object>} Payment result
 */
export const processPayment = async (paymentData) => {
  return apiRequest('/payments/process', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  });
};

/**
 * Get payment methods
 * @returns {Promise<Array>} Available payment methods
 */
export const getPaymentMethods = async () => {
  return apiRequest('/payments/methods');
};

/**
 * Get payment history
 * @param {Object} filters - Payment filters
 * @returns {Promise<Array>} Payment history
 */
export const getPaymentHistory = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = `/payments/history${queryParams ? `?${queryParams}` : ''}`;
  
  return apiRequest(endpoint);
};

// ===========================================
// NOTIFICATIONS API ENDPOINTS
// ===========================================

/**
 * Get user notifications
 * @param {Object} filters - Notification filters
 * @returns {Promise<Array>} User notifications
 */
export const getNotifications = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = `/notifications${queryParams ? `?${queryParams}` : ''}`;
  
  return apiRequest(endpoint);
};

/**
 * Mark notification as read
 * @param {string|number} notificationId - Notification ID
 * @returns {Promise<Object>} Update confirmation
 */
export const markNotificationAsRead = async (notificationId) => {
  return apiRequest(`/notifications/${notificationId}/read`, {
    method: 'PUT',
  });
};

/**
 * Mark all notifications as read
 * @returns {Promise<Object>} Update confirmation
 */
export const markAllNotificationsAsRead = async () => {
  return apiRequest('/notifications/read-all', {
    method: 'PUT',
  });
};

// ===========================================
// ANALYTICS & STATISTICS API ENDPOINTS
// ===========================================

/**
 * Get product analytics
 * @param {Object} filters - Analytics filters
 * @returns {Promise<Object>} Product analytics data
 */
export const getProductAnalytics = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = `/analytics/products${queryParams ? `?${queryParams}` : ''}`;
  
  return apiRequest(endpoint);
};

/**
 * Get sales statistics
 * @param {Object} filters - Statistics filters
 * @returns {Promise<Object>} Sales statistics
 */
export const getSalesStatistics = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = `/analytics/sales${queryParams ? `?${queryParams}` : ''}`;
  
  return apiRequest(endpoint);
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
};

/**
 * Get stored auth token
 * @returns {string|null} Auth token
 */
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
};

/**
 * Set auth token
 * @param {string} token - Auth token
 */
export const setAuthToken = (token) => {
  localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);
};

/**
 * Remove auth token
 */
export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
};

/**
 * Handle API errors
 * @param {Error} error - API error
 * @param {Function} onError - Error callback
 */
export const handleApiError = (error, onError) => {
  console.error('API Error:', error);
  
  if (onError) {
    onError(error);
  }
  
  // You can add global error handling here
  // For example: show toast notification, redirect to login, etc.
};
