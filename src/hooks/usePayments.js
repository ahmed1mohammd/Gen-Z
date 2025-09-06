import { useState, useEffect } from 'react';
// API imports for payment operations
import { 
  processPayment, 
  getPaymentMethods, 
  getPaymentHistory,
  handleApiError 
} from '../services/api';

/**
 * Custom hook for payment processing
 * Handles API calls for payments with loading states and error handling
 */
export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Process payment via API
   * API Call: POST /api/v1/payments/process
   * @param {Object} paymentData - Payment data (amount, payment_method, etc.)
   */
  const processPaymentRequest = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      
      const paymentResult = await processPayment(paymentData);
      return paymentResult;
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
    processPayment: processPaymentRequest,
    loading,
    error
  };
};

/**
 * Custom hook for payment methods
 * Handles fetching available payment methods
 */
export const usePaymentMethods = () => {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch payment methods from API
   * API Call: GET /api/v1/payments/methods
   */
  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const methodsData = await getPaymentMethods();
      setMethods(methodsData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return {
    methods,
    loading,
    error,
    refetch: fetchPaymentMethods
  };
};

/**
 * Custom hook for payment history
 * @param {Object} filters - Payment history filters
 */
export const usePaymentHistory = (filters = {}) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch payment history from API
   * API Call: GET /api/v1/payments/history
   * @param {Object} newFilters - Payment filters
   */
  const fetchPaymentHistory = async (newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      const paymentsData = await getPaymentHistory(newFilters);
      setPayments(paymentsData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [JSON.stringify(filters)]);

  return {
    payments,
    loading,
    error,
    refetch: fetchPaymentHistory
  };
};
