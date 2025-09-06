# Gen Z E-commerce Platform - API Documentation

## Overview
This document outlines all API endpoints and their usage in the Gen Z e-commerce platform. Each API call is documented with comments in the code.

## Base Configuration
- **Base URL**: `https://api.genz-store.com`
- **API Version**: `v1`
- **Content Type**: `application/json`
- **Authentication**: Bearer Token

## API Endpoints

### 1. Products API

#### Get All Products
```javascript
// API Call: GET /api/v1/products
// Usage: Fetch all products with optional filtering
const { products, loading, error } = useProducts({ category: 'watches' });
```

#### Get Single Product
```javascript
// API Call: GET /api/v1/products/{productId}
// Usage: Fetch product details by ID
const { product, loading, error } = useProduct(productId);
```

#### Search Products
```javascript
// API Call: GET /api/v1/products?q={query}
// Usage: Search products by query
const { results, loading, error, search } = useProductSearch('watch');
```

#### Get Products by Category
```javascript
// API Call: GET /api/v1/products?category={category}
// Usage: Fetch products by category
const { products, loading, error } = useCategoryProducts('watches');
```

#### Get Featured Products
```javascript
// API Call: GET /api/v1/products/featured?limit={limit}
// Usage: Fetch featured products
const { products, loading, error } = useFeaturedProducts(8);
```

#### Get Product Reviews
```javascript
// API Call: GET /api/v1/products/{productId}/reviews
// Usage: Fetch product reviews
const { reviews, loading, error, addReview } = useProductReviews(productId);
```

### 2. Cart API

#### Get Cart
```javascript
// API Call: GET /api/v1/cart
// Usage: Fetch user's cart
const { items, loading, error } = useCart();
```

#### Add to Cart
```javascript
// API Call: POST /api/v1/cart/items
// Usage: Add item to cart
const addToCart = async (product) => {
  await addToCartAPI({
    product_id: product.id,
    quantity: 1,
    price: product.price
  });
};
```

#### Update Cart Item
```javascript
// API Call: PUT /api/v1/cart/items/{itemId}
// Usage: Update cart item quantity
const updateQuantity = async (itemId, quantity) => {
  await updateCartItem(itemId, quantity);
};
```

#### Remove from Cart
```javascript
// API Call: DELETE /api/v1/cart/items/{itemId}
// Usage: Remove item from cart
const removeFromCart = async (itemId) => {
  await removeFromCartAPI(itemId);
};
```

#### Clear Cart
```javascript
// API Call: DELETE /api/v1/cart
// Usage: Clear entire cart
const clearCart = async () => {
  await clearCartAPI();
};
```

### 3. Authentication API

#### User Login
```javascript
// API Call: POST /api/v1/auth/login
// Usage: User login
const login = async (credentials) => {
  const response = await loginUser(credentials);
  setAuthToken(response.token);
};
```

#### User Registration
```javascript
// API Call: POST /api/v1/auth/register
// Usage: User registration
const register = async (userData) => {
  const response = await registerUser(userData);
  setAuthToken(response.token);
};
```

#### User Logout
```javascript
// API Call: POST /api/v1/auth/logout
// Usage: User logout
const logout = async () => {
  await logoutUser();
  removeAuthToken();
};
```

#### Get Current User
```javascript
// API Call: GET /api/v1/auth/me
// Usage: Get current user profile
const user = await getCurrentUser();
```

#### Update User Profile
```javascript
// API Call: PUT /api/v1/auth/profile
// Usage: Update user profile
const updateProfile = async (profileData) => {
  await updateUserProfile(profileData);
};
```

#### Change Password
```javascript
// API Call: PUT /api/v1/auth/change-password
// Usage: Change user password
const changePassword = async (passwordData) => {
  await changePassword(passwordData);
};
```

### 4. Orders API

#### Get Orders
```javascript
// API Call: GET /api/v1/orders
// Usage: Fetch user orders
const { orders, loading, error } = useOrders({ status: 'completed' });
```

#### Get Single Order
```javascript
// API Call: GET /api/v1/orders/{orderId}
// Usage: Fetch order details
const { order, loading, error } = useOrder(orderId);
```

#### Create Order
```javascript
// API Call: POST /api/v1/orders
// Usage: Create new order
const { createOrder, loading, error } = useCreateOrder();
const newOrder = await createOrder(orderData);
```

#### Update Order Status
```javascript
// API Call: PUT /api/v1/orders/{orderId}/status
// Usage: Update order status
const { updateStatus } = useOrderStatus();
await updateStatus(orderId, 'shipped');
```

### 5. Payments API

#### Process Payment
```javascript
// API Call: POST /api/v1/payments/process
// Usage: Process payment
const { processPayment, loading, error } = usePayment();
const result = await processPayment(paymentData);
```

#### Get Payment Methods
```javascript
// API Call: GET /api/v1/payments/methods
// Usage: Fetch available payment methods
const { methods, loading, error } = usePaymentMethods();
```

#### Get Payment History
```javascript
// API Call: GET /api/v1/payments/history
// Usage: Fetch payment history
const { payments, loading, error } = usePaymentHistory();
```

### 6. Wishlist API

#### Get Wishlist
```javascript
// API Call: GET /api/v1/wishlist
// Usage: Fetch user wishlist
const { wishlist, loading, error } = useWishlist();
```

#### Add to Wishlist
```javascript
// API Call: POST /api/v1/wishlist
// Usage: Add product to wishlist
const { addItem } = useWishlist();
await addItem(productId);
```

#### Remove from Wishlist
```javascript
// API Call: DELETE /api/v1/wishlist/{productId}
// Usage: Remove product from wishlist
const { removeItem } = useWishlist();
await removeItem(productId);
```

#### Toggle Wishlist
```javascript
// Usage: Toggle product in wishlist
const { toggleWishlist, isInWishlist } = useWishlist();
await toggleWishlist(productId);
```

### 7. Notifications API

#### Get Notifications
```javascript
// API Call: GET /api/v1/notifications
// Usage: Fetch user notifications
const { notifications, unreadCount, loading, error } = useNotifications();
```

#### Mark Notification as Read
```javascript
// API Call: PUT /api/v1/notifications/{notificationId}/read
// Usage: Mark single notification as read
const { markAsRead } = useNotifications();
await markAsRead(notificationId);
```

#### Mark All Notifications as Read
```javascript
// API Call: PUT /api/v1/notifications/read-all
// Usage: Mark all notifications as read
const { markAllAsRead } = useNotifications();
await markAllAsRead();
```

### 8. Analytics API

#### Get Product Analytics
```javascript
// API Call: GET /api/v1/analytics/products
// Usage: Fetch product analytics
const { analytics, loading, error } = useProductAnalytics();
```

#### Get Sales Statistics
```javascript
// API Call: GET /api/v1/analytics/sales
// Usage: Fetch sales statistics
const { statistics, loading, error } = useSalesStatistics();
```

## Error Handling

All API calls include comprehensive error handling:

```javascript
try {
  const data = await apiCall();
  // Handle success
} catch (error) {
  handleApiError(error, (err) => {
    // Handle error
    console.error('API Error:', err.message);
  });
}
```

## Loading States

All hooks provide loading states:

```javascript
const { data, loading, error } = useApiHook();

if (loading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorMessage error={error} />;
}

return <DataComponent data={data} />;
```

## Authentication

All protected endpoints require authentication:

```javascript
const headers = {
  'Authorization': `Bearer ${getAuthToken()}`,
  'Content-Type': 'application/json'
};
```

## Environment Variables

Configure the following environment variables:

```env
REACT_APP_API_URL=https://api.genz-store.com
REACT_APP_API_VERSION=v1
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
REACT_APP_PAYPAL_CLIENT_ID=...
```

## Usage Examples

### Complete Product Management Flow

```javascript
import { useProducts, useCart, useWishlist } from './hooks';

const ProductPage = ({ productId }) => {
  // Fetch product details
  const { product, loading, error } = useProduct(productId);
  
  // Cart operations
  const { addToCart, loading: cartLoading } = useCart();
  
  // Wishlist operations
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };
  
  const handleToggleWishlist = async () => {
    try {
      await toggleWishlist(product.id);
      // Update UI
    } catch (error) {
      // Handle error
    }
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <button onClick={handleAddToCart} disabled={cartLoading}>
        Add to Cart
      </button>
      <button onClick={handleToggleWishlist}>
        {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
};
```

This documentation provides a comprehensive guide for all API interactions in the Gen Z e-commerce platform.
