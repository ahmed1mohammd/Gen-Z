import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
// Mock data import - using local data instead of API
import { products } from '../data/products';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Using mock data instead of API calls
  // TODO: Replace with API calls when backend is ready
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
        {/* Mobile Background Pattern */}
        <div className="absolute inset-0 opacity-15 md:opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Mobile Background Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 md:opacity-10"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&q=80&auto=format&ixlib=rb-4.0.3")`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/60 to-transparent md:from-slate-900/90 md:via-slate-800/50"></div>
        </div>
        
        {/* Mobile Floating Elements - Simplified for performance */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-red-500/8 to-orange-500/8 rounded-full blur-2xl animate-pulse md:hidden"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-2xl animate-pulse delay-1000 md:hidden"></div>
          
          {/* Desktop Floating Elements */}
          <div className="hidden md:block">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Mobile Content - Centered and Optimized */}
            <div className="space-y-8 md:space-y-8 lg:space-y-12 text-center lg:text-left">
              
              {/* Mobile Main Heading */}
              <div className="space-y-6 md:space-y-6 lg:space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                  <span className="block text-white/90 mb-2 md:mb-2">
                    Welcome to
                  </span>
                  <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                    Gen Z
                  </span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 px-4 md:px-0">
                  Discover timeless watches and iconic fragrances crafted for the modern generation
                </p>
              </div>
              
              {/* Mobile CTA Buttons - Stacked */}
              <div className="flex flex-col gap-4 md:flex-row md:gap-4 justify-center lg:justify-start px-4 md:px-0">
                <button 
                  onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative flex items-center justify-center">
                    Explore Collection
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                
                <button 
                  onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group border-2 border-white/20 hover:border-red-400/50 text-white hover:text-red-400 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/5 hover:bg-red-500/10"
                >
                  <span className="flex items-center justify-center">
                    View Categories
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              </div>
              
              {/* Mobile Stats Grid - Compact */}
              <div className="grid grid-cols-3 gap-6 md:gap-6 lg:gap-8 pt-8 md:pt-8 px-4 md:px-0">
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-3xl md:text-3xl lg:text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">20+</div>
                  <div className="text-gray-300 text-sm md:text-sm lg:text-base font-medium">Premium Products</div>
                </div>
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-3xl md:text-3xl lg:text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-gray-300 text-sm md:text-sm lg:text-base font-medium">Authentic Quality</div>
                </div>
                <div className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-3xl md:text-3xl lg:text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-gray-300 text-sm md:text-sm lg:text-base font-medium">Support</div>
                </div>
              </div>
            </div>
            
            {/* Desktop Right Content - Hidden on mobile */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main Product Showcase - Professional Design */}
                <div className="relative w-full h-[650px] bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-700/30 overflow-hidden shadow-2xl">
                  
                  {/* Professional Product Grid */}
                  <div className="absolute inset-6 grid grid-cols-2 gap-6">
                    {/* Watch Showcase */}
                    <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/40 rounded-2xl p-8 flex items-center justify-center group hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/10">
                      <div className="relative w-full h-full">
                        <img 
                          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&q=80&auto=format&ixlib=rb-4.0.3"
                          alt="Premium Watch"
                          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/400x400/1f2937/ffffff?text=Premium+Watch`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-white text-sm font-semibold bg-black/60 px-3 py-2 rounded-lg backdrop-blur-sm">Premium Watch</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Perfume Showcase */}
                    <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/40 rounded-2xl p-8 flex items-center justify-center group hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/10">
                      <div className="relative w-full h-full">
                        <img 
                          src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80&auto=format&ixlib=rb-4.0.3"
                          alt="Luxury Perfume"
                          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/400x400/1f2937/ffffff?text=Luxury+Perfume`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-white text-sm font-semibold bg-black/60 px-3 py-2 rounded-lg backdrop-blur-sm">Luxury Perfume</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Brand Showcase */}
                    <div className="col-span-2 bg-gradient-to-r from-red-600/10 to-orange-500/10 rounded-2xl p-10 flex items-center justify-center group hover:scale-105 transition-all duration-500">
                      <div className="text-center">
                        <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">Gen Z</h3>
                        <p className="text-gray-300 text-xl group-hover:text-white transition-colors duration-300">Premium Collection</p>
                        <div className="mt-4 w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Professional Floating Elements */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm border border-red-500/20 animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm animate-pulse delay-1000"></div>
                  
                  {/* Professional Border Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Professional Decorative Elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500/30 rounded-full animate-ping"></div>
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-blue-500/30 rounded-full animate-ping delay-500"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Scroll Indicator - Simplified */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:bottom-8">
          <div className="flex flex-col items-center space-y-2 md:space-y-3 group cursor-pointer">
            <span className="text-xs md:text-sm text-gray-400 font-medium group-hover:text-white transition-colors duration-300 hidden md:block">Scroll Down</span>
            <div className="relative">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-red-400 transition-colors duration-300 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Mobile Responsive */}
      <section id="products-section" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-red-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Mobile Optimized */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Our 
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"> Products</span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Handpicked selection of premium watches and luxury fragrances, 
              carefully curated for the modern generation
            </p>
          </div>

          {/* Category Filter - Mobile Responsive */}
          <div id="categories-section" className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-1 inline-flex border border-gray-700/50 overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setSelectedCategory('watches')}
                className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
                  selectedCategory === 'watches'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Watches
              </button>
              <button
                onClick={() => setSelectedCategory('perfumes')}
                className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
                  selectedCategory === 'perfumes'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Perfumes
              </button>
            </div>
          </div>

          {/* Products Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Bottom CTA - Mobile Responsive */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              <span className="flex items-center justify-center">
                Back to Top
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5 5 5M12 6v12" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
