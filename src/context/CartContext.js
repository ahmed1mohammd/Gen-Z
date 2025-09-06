import React, { createContext, useContext, useReducer } from 'react';
import { useToast } from './ToastContext';
// TODO: Uncomment when API is ready
// import { 
//   getCart, 
//   addToCart as addToCartAPI, 
//   updateCartItem, 
//   removeFromCart as removeFromCartAPI, 
//   clearCart as clearCartAPI,
//   handleApiError 
// } from '../services/api';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { addToast } = useToast();

  // Using mock data instead of API calls
  // TODO: Replace with API calls when backend is ready

  /**
   * Add product to cart (Mock implementation)
   * @param {Object} product - Product to add
   */
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    addToast(`${product.name} added to cart`, 'success');
  };

  /**
   * Remove product from cart (Mock implementation)
   * @param {string|number} productId - Product ID to remove
   */
  const removeFromCart = (productId) => {
    const item = state.items.find(item => item.id === productId);
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    if (item) {
      addToast(`${item.name} removed from cart`, 'error');
    }
  };

  /**
   * Update product quantity in cart (Mock implementation)
   * @param {string|number} productId - Product ID
   * @param {number} quantity - New quantity
   */
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  /**
   * Clear entire cart (Mock implementation)
   */
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    addToast('Cart cleared', 'error');
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
