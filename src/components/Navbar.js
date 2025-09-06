import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Mobile Responsive */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Gen Z</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className="p-3 bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm rounded-full border border-red-500/30 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-400/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Home"
            >
              <svg 
                className="w-6 h-6 text-white group-hover:text-red-200 transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" 
                />
              </svg>
            </Link>
            
            <Link 
              to="/cart" 
              className="relative group"
            >
              <div className="p-3 bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm rounded-full border border-red-500/30 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-400/50 transition-all duration-300 hover:scale-110">
                <svg 
                  className="w-6 h-6 text-white group-hover:text-red-200 transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4" 
                  />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg border-2 border-gray-900">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile Navigation - Menu Only */}
          <div className="md:hidden flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm rounded-full border border-red-500/30 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-400/50 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6 text-white transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Simplified */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-xl">
            <div className="px-4 py-4 space-y-3">
              {/* Home Link */}
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm rounded-lg border border-red-500/30 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-400/50 transition-all duration-300"
              >
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" 
                  />
                </svg>
                <span className="text-white font-semibold text-lg">Home</span>
              </Link>
              
              {/* Cart Link with Badge */}
              <Link 
                to="/cart" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm rounded-lg border border-red-500/30 hover:from-red-600/30 hover:to-red-700/30 hover:border-red-400/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z" 
                    />
                  </svg>
                  <span className="text-white font-semibold text-lg">Shopping Cart</span>
                </div>
                {getTotalItems() > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full h-7 w-7 flex items-center justify-center shadow-lg">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
