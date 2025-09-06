import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { addToast } = useToast();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-300 mb-8">
              Add some products to get started
            </p>
            <Link
              to="/"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items - Mobile Responsive */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl shadow-gray-900/50 overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="p-3 sm:p-6 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 capitalize text-sm sm:text-base">
                        {item.category}
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-white">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      {/* Quantity Controls - Mobile Responsive */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-red-900/20 hover:border-red-500 text-sm text-gray-300 transition-all duration-200 hover:scale-110"
                        >
                          -
                        </button>
                        <span className="w-6 sm:w-8 text-center text-sm text-white font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-600 flex items-center justify-center hover:bg-red-900/20 hover:border-red-500 text-sm text-gray-300 transition-all duration-200 hover:scale-110"
                        >
                          +
                        </button>
                      </div>
                      {/* Delete Button - Mobile Responsive */}
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          addToast(`${item.name} removed from cart`, 'error');
                        }}
                        className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 hover:scale-110 border border-red-500/30 hover:border-red-400/50"
                        title="Remove item"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary - Mobile Responsive */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl shadow-gray-900/50 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Order Summary</h2>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-400 truncate flex-1 mr-2">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-semibold text-white flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-3 sm:pt-4">
                <div className="flex justify-between text-lg sm:text-xl font-bold text-white">
                  <span>Total</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-red-600 text-white py-3 sm:py-2 px-4 rounded-md text-center font-semibold hover:bg-red-700 transition-colors duration-200 mt-4 sm:mt-6 block text-sm sm:text-base"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
