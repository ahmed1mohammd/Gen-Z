import { useState, useEffect } from 'react';
// API imports for wishlist operations
import { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist,
  handleApiError 
} from '../services/api';

/**
 * Custom hook for managing user wishlist
 * Handles API calls for wishlist with loading states and error handling
 */
export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch wishlist from API
   * API Call: GET /api/v1/wishlist
   */
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const wishlistData = await getWishlist();
      setWishlist(wishlistData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add product to wishlist
   * API Call: POST /api/v1/wishlist
   * @param {string|number} productId - Product ID
   */
  const addItem = async (productId) => {
    try {
      const newItem = await addToWishlist(productId);
      
      // Update local state
      setWishlist(prev => [...prev, newItem]);
      
      return newItem;
    } catch (err) {
      handleApiError(err, (error) => {
        console.error('Failed to add to wishlist:', error);
      });
      throw err;
    }
  };

  /**
   * Remove product from wishlist
   * API Call: DELETE /api/v1/wishlist/{productId}
   * @param {string|number} productId - Product ID
   */
  const removeItem = async (productId) => {
    try {
      await removeFromWishlist(productId);
      
      // Update local state
      setWishlist(prev => prev.filter(item => item.product_id !== productId));
    } catch (err) {
      handleApiError(err, (error) => {
        console.error('Failed to remove from wishlist:', error);
      });
      throw err;
    }
  };

  /**
   * Check if product is in wishlist
   * @param {string|number} productId - Product ID
   * @returns {boolean} - Whether product is in wishlist
   */
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id === productId);
  };

  /**
   * Toggle product in wishlist
   * @param {string|number} productId - Product ID
   */
  const toggleWishlist = async (productId) => {
    if (isInWishlist(productId)) {
      await removeItem(productId);
    } else {
      await addItem(productId);
    }
  };

  // Fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  return {
    wishlist,
    loading,
    error,
    addItem,
    removeItem,
    toggleWishlist,
    isInWishlist,
    refetch: fetchWishlist
  };
};
