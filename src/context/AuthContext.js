import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from './ToastContext';
// API imports for authentication
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser, 
  updateUserProfile,
  changePassword,
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  handleApiError 
} from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        loading: false
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });
  const { addToast } = useToast();

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check if user is authenticated and load user data
   * API Call: GET /api/v1/auth/me
   */
  const checkAuthStatus = async () => {
    if (!isAuthenticated()) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const userData = await getCurrentUser();
      const token = getAuthToken();
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: userData, token } 
      });
    } catch (error) {
      // Token might be expired, clear it
      removeAuthToken();
      dispatch({ type: 'LOGOUT' });
      
      handleApiError(error, (err) => {
        console.log('Auth check failed:', err.message);
      });
    }
  };

  /**
   * User login
   * API Call: POST /api/v1/auth/login
   * @param {Object} credentials - Login credentials (email, password)
   */
  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      const response = await loginUser(credentials);
      
      // Store token in localStorage
      setAuthToken(response.token);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: response.user, 
          token: response.token 
        } 
      });
      
      addToast('Login successful!', 'success');
      return response;
    } catch (error) {
      handleApiError(error, (err) => {
        dispatch({ type: 'SET_ERROR', payload: err.message });
        addToast('Login failed. Please check your credentials.', 'error');
      });
      throw error;
    }
  };

  /**
   * User registration
   * API Call: POST /api/v1/auth/register
   * @param {Object} userData - User registration data
   */
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      const response = await registerUser(userData);
      
      // Store token in localStorage
      setAuthToken(response.token);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: response.user, 
          token: response.token 
        } 
      });
      
      addToast('Registration successful!', 'success');
      return response;
    } catch (error) {
      handleApiError(error, (err) => {
        dispatch({ type: 'SET_ERROR', payload: err.message });
        addToast('Registration failed. Please try again.', 'error');
      });
      throw error;
    }
  };

  /**
   * User logout
   * API Call: POST /api/v1/auth/logout
   */
  const logout = async () => {
    try {
      // Call logout API
      await logoutUser();
    } catch (error) {
      // Even if API call fails, we should still logout locally
      console.error('Logout API failed:', error);
    } finally {
      // Clear token and user data
      removeAuthToken();
      dispatch({ type: 'LOGOUT' });
      addToast('Logged out successfully', 'success');
    }
  };

  /**
   * Update user profile
   * API Call: PUT /api/v1/auth/profile
   * @param {Object} profileData - Updated profile data
   */
  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const updatedUser = await updateUserProfile(profileData);
      
      dispatch({ 
        type: 'UPDATE_USER', 
        payload: updatedUser 
      });
      
      addToast('Profile updated successfully!', 'success');
      return updatedUser;
    } catch (error) {
      handleApiError(error, (err) => {
        dispatch({ type: 'SET_ERROR', payload: err.message });
        addToast('Failed to update profile', 'error');
      });
      throw error;
    }
  };

  /**
   * Change user password
   * API Call: PUT /api/v1/auth/change-password
   * @param {Object} passwordData - Password change data
   */
  const changeUserPassword = async (passwordData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      await changePassword(passwordData);
      
      dispatch({ type: 'SET_LOADING', payload: false });
      addToast('Password changed successfully!', 'success');
    } catch (error) {
      handleApiError(error, (err) => {
        dispatch({ type: 'SET_ERROR', payload: err.message });
        addToast('Failed to change password', 'error');
      });
      throw error;
    }
  };

  /**
   * Clear authentication error
   */
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      error: state.error,
      login,
      register,
      logout,
      updateProfile,
      changePassword: changeUserPassword,
      clearError,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
