import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl shadow-black/30 overflow-hidden border border-gray-700/30 hover:border-red-500/30 transition-all duration-700 transform hover:-translate-y-1 sm:hover:-translate-y-3 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-xl sm:hover:shadow-2xl hover:shadow-red-500/20">
      {/* Premium Badge - Mobile Responsive */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
        <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-red-600/90 to-red-700/90 text-white backdrop-blur-sm border border-red-500/30">
          Premium
        </span>
      </div>

      {/* Wishlist Button - Mobile Responsive */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
        <button className="p-1.5 sm:p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-white/70 hover:text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 hover:scale-110">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Image Container - Mobile Responsive */}
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x400/1f2937/ffffff?text=${encodeURIComponent(product.name)}`;
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Quick View Overlay - Hidden on mobile for better UX */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm sm:text-base"
          >
            Quick View
          </Link>
        </div>
      </div>
      
      {/* Content - Mobile Responsive */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Category Badge - Mobile Responsive */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 capitalize">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-400">4.8</span>
          </div>
        </div>

        {/* Product Name - Mobile Responsive */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        {/* Price - Mobile Responsive */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1 sm:space-x-2">
            <span className="text-2xl sm:text-3xl font-black text-white">
              ${product.price.toLocaleString()}
            </span>
            {product.price > 1000 && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                ${Math.round(product.price * 1.2).toLocaleString()}
              </span>
            )}
          </div>
          {product.price > 1000 && (
            <span className="bg-red-500/20 text-red-400 px-1.5 sm:px-2 py-1 rounded text-xs font-semibold">
              SALE
            </span>
          )}
        </div>
        
        {/* Action Buttons - Mobile Responsive */}
        <div className="flex space-x-2 pt-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gray-700/30 backdrop-blur-sm text-gray-300 px-2 sm:px-3 py-2 rounded-lg text-center text-xs font-medium hover:bg-gray-600/50 hover:text-white transition-all duration-300 hover:scale-105 border border-gray-600/30 hover:border-gray-500/50"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-2 sm:px-3 py-2 rounded-lg text-xs font-medium hover:from-red-700 hover:via-red-800 hover:to-red-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/30 border border-red-500/30 hover:border-red-400/50"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-red-500/10 group-hover:to-red-500/5 transition-all duration-700 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;
