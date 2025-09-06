import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 text-gray-400 hover:text-red-400 transition-colors duration-200 flex items-center text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl shadow-gray-900/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x600/374151/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="mb-6">
                <span className="text-sm text-gray-400 uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-white mt-2 mb-4">
                  {product.name}
                </h1>
                <p className="text-4xl font-bold text-white mb-6">
                  ${product.price.toLocaleString()}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
