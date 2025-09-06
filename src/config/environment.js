// Environment Configuration
// This file manages all environment variables and API configuration

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.genz-store.com',
  VERSION: process.env.REACT_APP_API_VERSION || 'v1',
  TIMEOUT: 10000, // 10 seconds
};

// Authentication Configuration
export const AUTH_CONFIG = {
  TOKEN_KEY: 'authToken',
  REFRESH_TOKEN_KEY: 'refreshToken',
  TOKEN_EXPIRY: process.env.REACT_APP_TOKEN_EXPIRY || '24h',
};

// Payment Configuration
export const PAYMENT_CONFIG = {
  STRIPE_PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  CURRENCY: 'USD',
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(process.env.REACT_APP_MAX_FILE_SIZE) || 5242880, // 5MB
  ALLOWED_TYPES: (process.env.REACT_APP_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(','),
  MAX_FILES: 5,
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
  MIXPANEL_TOKEN: process.env.REACT_APP_MIXPANEL_TOKEN,
  ENABLED: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
};

// Social Media Configuration
export const SOCIAL_CONFIG = {
  FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
  TWITTER_HANDLE: process.env.REACT_APP_TWITTER_HANDLE || '@genzstore',
};

// Email Configuration
export const EMAIL_CONFIG = {
  SERVICE: process.env.REACT_APP_EMAIL_SERVICE || 'sendgrid',
  FROM: process.env.REACT_APP_EMAIL_FROM || 'noreply@genz-store.com',
};

// Feature Flags
export const FEATURE_FLAGS = {
  WISHLIST: process.env.REACT_APP_ENABLE_WISHLIST === 'true',
  REVIEWS: process.env.REACT_APP_ENABLE_REVIEWS === 'true',
  NOTIFICATIONS: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
  ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
};

// Development Configuration
export const DEV_CONFIG = {
  DEBUG_MODE: process.env.REACT_APP_DEBUG_MODE === 'true',
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || 'info',
  MOCK_API: process.env.REACT_APP_MOCK_API === 'true',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCT_SEARCH: '/products',
  FEATURED_PRODUCTS: '/products/featured',
  PRODUCT_REVIEWS: (id) => `/products/${id}/reviews`,
  
  // Cart
  CART: '/cart',
  CART_ITEMS: '/cart/items',
  CART_ITEM_BY_ID: (id) => `/cart/items/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  ORDER_STATUS: (id) => `/orders/${id}/status`,
  
  // Authentication
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',
  AUTH_PROFILE: '/auth/profile',
  AUTH_CHANGE_PASSWORD: '/auth/change-password',
  
  // Wishlist
  WISHLIST: '/wishlist',
  WISHLIST_ITEM: (id) => `/wishlist/${id}`,
  
  // Payments
  PAYMENTS_PROCESS: '/payments/process',
  PAYMENTS_METHODS: '/payments/methods',
  PAYMENTS_HISTORY: '/payments/history',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_READ: (id) => `/notifications/${id}/read`,
  NOTIFICATIONS_READ_ALL: '/notifications/read-all',
  
  // Analytics
  ANALYTICS_PRODUCTS: '/analytics/products',
  ANALYTICS_SALES: '/analytics/sales',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}${endpoint}`;
};

// Helper function to check if feature is enabled
export const isFeatureEnabled = (feature) => {
  return FEATURE_FLAGS[feature] === true;
};

// Helper function to get environment
export const getEnvironment = () => {
  return process.env.NODE_ENV || 'development';
};

// Helper function to check if development mode
export const isDevelopment = () => {
  return getEnvironment() === 'development';
};

// Helper function to check if production mode
export const isProduction = () => {
  return getEnvironment() === 'production';
};
