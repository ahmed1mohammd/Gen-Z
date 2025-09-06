import { useState, useEffect } from 'react';
// API imports for product operations
import { 
  getProducts, 
  getProductById, 
  searchProducts, 
  getProductsByCategory,
  getFeaturedProducts,
  getProductReviews,
  addProductReview,
  handleApiError 
} from '../services/api';

/**
 * Custom hook for managing products data
 * Handles API calls for products with loading states and error handling
 */
export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch products from API
   * API Call: GET /api/v1/products
   * @param {Object} newFilters - Filter options
   */
  const fetchProducts = async (newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      const productsData = await getProducts(newFilters);
      setProducts(productsData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
};

/**
 * Custom hook for single product details
 * @param {string|number} productId - Product ID
 */
export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch single product from API
   * API Call: GET /api/v1/products/{productId}
   */
  const fetchProduct = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);
      
      const productData = await getProductById(productId);
      setProduct(productData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct
  };
};

/**
 * Custom hook for product search
 * @param {string} query - Search query
 * @param {Object} filters - Additional filters
 */
export const useProductSearch = (query, filters = {}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Search products via API
   * API Call: GET /api/v1/products?q={query}
   */
  const search = async (searchQuery = query, searchFilters = filters) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const searchResults = await searchProducts(searchQuery, searchFilters);
      setResults(searchResults);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      search();
    }
  }, [query, JSON.stringify(filters)]);

  return {
    results,
    loading,
    error,
    search
  };
};

/**
 * Custom hook for category products
 * @param {string} category - Product category
 * @param {Object} filters - Additional filters
 */
export const useCategoryProducts = (category, filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch products by category via API
   * API Call: GET /api/v1/products?category={category}
   */
  const fetchCategoryProducts = async () => {
    if (!category) return;

    try {
      setLoading(true);
      setError(null);
      
      const categoryProducts = await getProductsByCategory(category, filters);
      setProducts(categoryProducts);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category, JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
    refetch: fetchCategoryProducts
  };
};

/**
 * Custom hook for featured products
 * @param {number} limit - Number of featured products to fetch
 */
export const useFeaturedProducts = (limit = 8) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch featured products via API
   * API Call: GET /api/v1/products/featured?limit={limit}
   */
  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const featuredProducts = await getFeaturedProducts(limit);
      setProducts(featuredProducts);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, [limit]);

  return {
    products,
    loading,
    error,
    refetch: fetchFeaturedProducts
  };
};

/**
 * Custom hook for product reviews
 * @param {string|number} productId - Product ID
 */
export const useProductReviews = (productId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch product reviews via API
   * API Call: GET /api/v1/products/{productId}/reviews
   */
  const fetchReviews = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);
      
      const reviewsData = await getProductReviews(productId);
      setReviews(reviewsData);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add product review via API
   * API Call: POST /api/v1/products/{productId}/reviews
   * @param {Object} reviewData - Review data
   */
  const addReview = async (reviewData) => {
    try {
      setLoading(true);
      
      const newReview = await addProductReview(productId, reviewData);
      setReviews(prev => [newReview, ...prev]);
      
      return newReview;
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return {
    reviews,
    loading,
    error,
    addReview,
    refetch: fetchReviews
  };
};
