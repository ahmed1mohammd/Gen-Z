import { useState, useEffect } from 'react';
// API imports for analytics operations
import { 
  getProductAnalytics, 
  getSalesStatistics,
  handleApiError 
} from '../services/api';

/**
 * Custom hook for product analytics
 * Handles API calls for product analytics with loading states and error handling
 */
export const useProductAnalytics = (filters = {}) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch product analytics from API
   * API Call: GET /api/v1/analytics/products
   * @param {Object} newFilters - Analytics filters
   */
  const fetchAnalytics = async (newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      const analyticsData = await getProductAnalytics(newFilters);
      setAnalytics(analyticsData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [JSON.stringify(filters)]);

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics
  };
};

/**
 * Custom hook for sales statistics
 * Handles API calls for sales statistics with loading states and error handling
 */
export const useSalesStatistics = (filters = {}) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch sales statistics from API
   * API Call: GET /api/v1/analytics/sales
   * @param {Object} newFilters - Statistics filters
   */
  const fetchStatistics = async (newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      const statisticsData = await getSalesStatistics(newFilters);
      setStatistics(statisticsData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [JSON.stringify(filters)]);

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics
  };
};
