import React, { createContext, useContext, useReducer, useEffect } from 'react';

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

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check if user is authenticated and load user data
   * Mock implementation
   */
  const checkAuthStatus = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock user data
      const userData = {
        id: 1,
        email: 'user@example.com',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        created_at: '2024-01-01T00:00:00Z'
      };
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: userData, token } 
      });
    } catch (error) {
      // Token might be expired, clear it
      localStorage.removeItem('authToken');
      dispatch({ type: 'LOGOUT' });
      
      console.log('Auth check failed:', error.message);
    }
  };

  /**
   * User login
   * Mock implementation
   * @param {Object} credentials - Login credentials (email, password)
   */
  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      // Mock login validation
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        const token = 'mock-jwt-token-' + Date.now();
        const userData = {
          id: 1,
          email: credentials.email,
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          created_at: '2024-01-01T00:00:00Z'
        };
        
        // Store token in localStorage
        localStorage.setItem('authToken', token);
        
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: { 
            user: userData, 
            token: token 
          } 
        });
        
        return { user: userData, token };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  /**
   * User registration
   * Mock implementation
   * @param {Object} userData - User registration data
   */
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      // Mock registration
      const token = 'mock-jwt-token-' + Date.now();
      const newUser = {
        id: Date.now(),
        ...userData,
        created_at: new Date().toISOString()
      };
      
      // Store token in localStorage
      localStorage.setItem('authToken', token);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: newUser, 
          token: token 
        } 
      });
      
      return { user: newUser, token };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  /**
   * User logout
   * Mock implementation
   */
  const logout = async () => {
    try {
      // Clear token and user data
      localStorage.removeItem('authToken');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  /**
   * Update user profile
   * Mock implementation
   * @param {Object} profileData - Updated profile data
   */
  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const updatedUser = { ...state.user, ...profileData };
      
      dispatch({ 
        type: 'UPDATE_USER', 
        payload: updatedUser 
      });
      
      return updatedUser;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  /**
   * Change user password
   * Mock implementation
   * @param {Object} passwordData - Password change data
   */
  const changeUserPassword = async (passwordData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Mock password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
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
