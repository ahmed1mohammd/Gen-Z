// Mock API Service
// This file provides mock implementations of API calls for development

import { products } from '../data/products';
import { mockApiResponse, MOCK_CONFIG } from '../config/mockMode';

// Mock user data
const mockUsers = [
  {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    created_at: '2024-01-01T00:00:00Z'
  }
];

// Mock cart data
let mockCart = {
  items: [],
  total: 0,
  item_count: 0
};

// Mock orders data
let mockOrders = [
  {
    id: 1,
    user_id: 1,
    status: 'completed',
    total: 95,
    items: [
      { product_id: 3, quantity: 1, price: 95, name: 'Fossil Grant' }
    ],
    shipping_address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  }
];

// Mock wishlist data
let mockWishlist = [
  { id: 1, product_id: 1, user_id: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: 2, product_id: 4, user_id: 1, created_at: '2024-01-02T00:00:00Z' }
];

// Mock notifications data
let mockNotifications = [
  {
    id: 1,
    user_id: 1,
    title: 'Welcome to Gen Z Store!',
    message: 'Thank you for joining our premium collection.',
    type: 'welcome',
    read: false,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    user_id: 1,
    title: 'Order Shipped',
    message: 'Your order #1 has been shipped and is on its way.',
    type: 'order',
    read: false,
    created_at: '2024-01-16T09:00:00Z'
  }
];

// ===========================================
// MOCK PRODUCTS API
// ===========================================

export const mockGetProducts = async (filters = {}) => {
  let filteredProducts = [...products];
  
  // Apply filters
  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.price_min) {
    filteredProducts = filteredProducts.filter(p => p.price >= filters.price_min);
  }
  
  if (filters.price_max) {
    filteredProducts = filteredProducts.filter(p => p.price <= filters.price_max);
  }
  
  return mockApiResponse({
    products: filteredProducts,
    total: filteredProducts.length,
    page: 1,
    limit: 20
  });
};

export const mockGetProductById = async (productId) => {
  const product = products.find(p => p.id === parseInt(productId));
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return mockApiResponse(product);
};

export const mockGetFeaturedProducts = async (limit = 8) => {
  const featured = products.slice(0, limit);
  return mockApiResponse(featured);
};

export const mockGetProductReviews = async (productId) => {
  const reviews = [
    {
      id: 1,
      product_id: parseInt(productId),
      user_id: 1,
      rating: 5,
      comment: 'Excellent product! Highly recommended.',
      created_at: '2024-01-10T00:00:00Z'
    },
    {
      id: 2,
      product_id: parseInt(productId),
      user_id: 2,
      rating: 4,
      comment: 'Good quality, fast shipping.',
      created_at: '2024-01-12T00:00:00Z'
    }
  ];
  
  return mockApiResponse(reviews);
};

export const mockAddProductReview = async (productId, reviewData) => {
  const newReview = {
    id: Date.now(),
    product_id: parseInt(productId),
    user_id: 1,
    ...reviewData,
    created_at: new Date().toISOString()
  };
  
  return mockApiResponse(newReview);
};

// ===========================================
// MOCK CART API
// ===========================================

export const mockGetCart = async () => {
  return mockApiResponse(mockCart);
};

export const mockAddToCart = async (itemData) => {
  const existingItem = mockCart.items.find(item => item.product_id === itemData.product_id);
  
  if (existingItem) {
    existingItem.quantity += itemData.quantity || 1;
  } else {
    const product = products.find(p => p.id === itemData.product_id);
    mockCart.items.push({
      id: Date.now(),
      product_id: itemData.product_id,
      quantity: itemData.quantity || 1,
      price: itemData.price || product?.price || 0,
      name: product?.name || 'Unknown Product'
    });
  }
  
  // Update totals
  mockCart.item_count = mockCart.items.reduce((sum, item) => sum + item.quantity, 0);
  mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return mockApiResponse(mockCart);
};

export const mockUpdateCartItem = async (itemId, quantity) => {
  const item = mockCart.items.find(item => item.id === parseInt(itemId));
  
  if (!item) {
    throw new Error('Cart item not found');
  }
  
  item.quantity = quantity;
  
  // Update totals
  mockCart.item_count = mockCart.items.reduce((sum, item) => sum + item.quantity, 0);
  mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return mockApiResponse(mockCart);
};

export const mockRemoveFromCart = async (itemId) => {
  mockCart.items = mockCart.items.filter(item => item.id !== parseInt(itemId));
  
  // Update totals
  mockCart.item_count = mockCart.items.reduce((sum, item) => sum + item.quantity, 0);
  mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return mockApiResponse(mockCart);
};

export const mockClearCart = async () => {
  mockCart = { items: [], total: 0, item_count: 0 };
  return mockApiResponse(mockCart);
};

// ===========================================
// MOCK AUTH API
// ===========================================

export const mockLoginUser = async (credentials) => {
  const user = mockUsers.find(u => u.email === credentials.email);
  
  if (!user || credentials.password !== 'password') {
    throw new Error('Invalid credentials');
  }
  
  const token = 'mock-jwt-token-' + Date.now();
  
  return mockApiResponse({
    user,
    token,
    expires_in: 86400
  });
};

export const mockRegisterUser = async (userData) => {
  const newUser = {
    id: Date.now(),
    ...userData,
    created_at: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  
  const token = 'mock-jwt-token-' + Date.now();
  
  return mockApiResponse({
    user: newUser,
    token,
    expires_in: 86400
  });
};

export const mockLogoutUser = async () => {
  return mockApiResponse({ message: 'Logged out successfully' });
};

export const mockGetCurrentUser = async () => {
  return mockApiResponse(mockUsers[0]);
};

export const mockUpdateUserProfile = async (profileData) => {
  const updatedUser = { ...mockUsers[0], ...profileData };
  mockUsers[0] = updatedUser;
  
  return mockApiResponse(updatedUser);
};

export const mockChangePassword = async (passwordData) => {
  return mockApiResponse({ message: 'Password changed successfully' });
};

// ===========================================
// MOCK ORDERS API
// ===========================================

export const mockGetOrders = async (filters = {}) => {
  let filteredOrders = [...mockOrders];
  
  if (filters.status) {
    filteredOrders = filteredOrders.filter(order => order.status === filters.status);
  }
  
  return mockApiResponse(filteredOrders);
};

export const mockGetOrderById = async (orderId) => {
  const order = mockOrders.find(o => o.id === parseInt(orderId));
  
  if (!order) {
    throw new Error('Order not found');
  }
  
  return mockApiResponse(order);
};

export const mockCreateOrder = async (orderData) => {
  const newOrder = {
    id: Date.now(),
    user_id: 1,
    status: 'pending',
    ...orderData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockOrders.push(newOrder);
  
  // Clear cart after order creation
  mockCart = { items: [], total: 0, item_count: 0 };
  
  return mockApiResponse(newOrder);
};

export const mockUpdateOrderStatus = async (orderId, status) => {
  const order = mockOrders.find(o => o.id === parseInt(orderId));
  
  if (!order) {
    throw new Error('Order not found');
  }
  
  order.status = status;
  order.updated_at = new Date().toISOString();
  
  return mockApiResponse(order);
};

// ===========================================
// MOCK WISHLIST API
// ===========================================

export const mockGetWishlist = async () => {
  const wishlistItems = mockWishlist.map(item => {
    const product = products.find(p => p.id === item.product_id);
    return {
      ...item,
      product: product || null
    };
  });
  
  return mockApiResponse(wishlistItems);
};

export const mockAddToWishlist = async (productId) => {
  const existingItem = mockWishlist.find(item => item.product_id === parseInt(productId));
  
  if (existingItem) {
    return mockApiResponse(existingItem);
  }
  
  const newItem = {
    id: Date.now(),
    product_id: parseInt(productId),
    user_id: 1,
    created_at: new Date().toISOString()
  };
  
  mockWishlist.push(newItem);
  
  return mockApiResponse(newItem);
};

export const mockRemoveFromWishlist = async (productId) => {
  mockWishlist = mockWishlist.filter(item => item.product_id !== parseInt(productId));
  
  return mockApiResponse({ message: 'Item removed from wishlist' });
};

// ===========================================
// MOCK NOTIFICATIONS API
// ===========================================

export const mockGetNotifications = async (filters = {}) => {
  let filteredNotifications = [...mockNotifications];
  
  if (filters.unread_only) {
    filteredNotifications = filteredNotifications.filter(n => !n.read);
  }
  
  return mockApiResponse(filteredNotifications);
};

export const mockMarkNotificationAsRead = async (notificationId) => {
  const notification = mockNotifications.find(n => n.id === parseInt(notificationId));
  
  if (notification) {
    notification.read = true;
  }
  
  return mockApiResponse(notification);
};

export const mockMarkAllNotificationsAsRead = async () => {
  mockNotifications.forEach(notification => {
    notification.read = true;
  });
  
  return mockApiResponse({ message: 'All notifications marked as read' });
};

// ===========================================
// MOCK PAYMENTS API
// ===========================================

export const mockProcessPayment = async (paymentData) => {
  const paymentResult = {
    id: 'mock-payment-' + Date.now(),
    status: 'succeeded',
    amount: paymentData.amount,
    currency: 'USD',
    payment_method: paymentData.payment_method,
    created_at: new Date().toISOString()
  };
  
  return mockApiResponse(paymentResult);
};

export const mockGetPaymentMethods = async () => {
  const methods = [
    { id: 'card', name: 'Credit Card', type: 'card' },
    { id: 'paypal', name: 'PayPal', type: 'paypal' },
    { id: 'apple_pay', name: 'Apple Pay', type: 'wallet' }
  ];
  
  return mockApiResponse(methods);
};

export const mockGetPaymentHistory = async (filters = {}) => {
  const payments = [
    {
      id: 'mock-payment-1',
      amount: 95,
      currency: 'USD',
      status: 'succeeded',
      payment_method: 'card',
      created_at: '2024-01-15T10:30:00Z'
    }
  ];
  
  return mockApiResponse(payments);
};

// ===========================================
// MOCK ANALYTICS API
// ===========================================

export const mockGetProductAnalytics = async (filters = {}) => {
  const analytics = {
    total_products: products.length,
    total_views: 1250,
    total_sales: 45,
    revenue: 12500,
    top_products: products.slice(0, 5).map(p => ({
      id: p.id,
      name: p.name,
      views: Math.floor(Math.random() * 100),
      sales: Math.floor(Math.random() * 20)
    }))
  };
  
  return mockApiResponse(analytics);
};

export const mockGetSalesStatistics = async (filters = {}) => {
  const statistics = {
    total_orders: mockOrders.length,
    total_revenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
    average_order_value: mockOrders.reduce((sum, order) => sum + order.total, 0) / mockOrders.length,
    orders_by_status: {
      pending: mockOrders.filter(o => o.status === 'pending').length,
      completed: mockOrders.filter(o => o.status === 'completed').length,
      cancelled: mockOrders.filter(o => o.status === 'cancelled').length
    }
  };
  
  return mockApiResponse(statistics);
};
