import { useState, useEffect } from 'react';
// API imports for order operations
import { 
  getOrders, 
  getOrderById, 
  createOrder, 
  updateOrderStatus,
  handleApiError 
} from '../services/api';

/**
 * Custom hook for managing user orders
 * Handles API calls for orders with loading states and error handling
 */
export const useOrders = (filters = {}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user orders from API
   * API Call: GET /api/v1/orders
   * @param {Object} newFilters - Order filters (status, date_range, etc.)
   */
  const fetchOrders = async (newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      const ordersData = await getOrders(newFilters);
      setOrders(ordersData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when filters change
  useEffect(() => {
    fetchOrders();
  }, [JSON.stringify(filters)]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders
  };
};

/**
 * Custom hook for single order details
 * @param {string|number} orderId - Order ID
 */
export const useOrder = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch single order from API
   * API Call: GET /api/v1/orders/{orderId}
   */
  const fetchOrder = async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      setError(null);
      
      const orderData = await getOrderById(orderId);
      setOrder(orderData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  return {
    order,
    loading,
    error,
    refetch: fetchOrder
  };
};

/**
 * Custom hook for creating orders
 */
export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Create new order via API
   * API Call: POST /api/v1/orders
   * @param {Object} orderData - Order data (items, shipping_address, etc.)
   */
  const createNewOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newOrder = await createOrder(orderData);
      return newOrder;
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder: createNewOrder,
    loading,
    error
  };
};

/**
 * Custom hook for order status management
 */
export const useOrderStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Update order status via API
   * API Call: PUT /api/v1/orders/{orderId}/status
   * @param {string|number} orderId - Order ID
   * @param {string} status - New status
   */
  const updateStatus = async (orderId, status) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedOrder = await updateOrderStatus(orderId, status);
      return updatedOrder;
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateStatus,
    loading,
    error
  };
};
