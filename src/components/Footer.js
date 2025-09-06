import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-red-900 text-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Compact Footer */}
        <div className="md:hidden">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              Gen Z
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed">
              Modern e-commerce for watches and perfumes
            </p>
            <div className="flex justify-center space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500/20 hover:scale-110 transition-all duration-300"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500/20 hover:scale-110 transition-all duration-300"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500/20 hover:scale-110 transition-all duration-300"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>© 2024 Gen Z E-commerce. All rights reserved.</p>
              <p>Made by Ahmed zayed</p>
            </div>
          </div>
        </div>

        {/* Desktop: Full Footer */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand Section */}
            <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                Gen Z
              </h2>
              <p className="text-gray-200 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Modern e-commerce for watches and perfumes. Discover premium quality products curated for the modern generation.
              </p>
              <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500/20 hover:scale-110 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-red-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500/20 hover:scale-110 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-red-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500/20 hover:scale-110 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-red-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-red-500/20 hover:scale-110 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-red-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-red-200">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm sm:text-base">
                    About Us
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm sm:text-base">
                    Contact
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm sm:text-base">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm sm:text-base">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm sm:text-base">
                    Shipping Info
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-red-200">Contact Info</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">info@genz.com</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">01023973147</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base">giza cairo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700/50 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
                © 2024 Easy Cachier E-commerce. All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                <span>Made with love for Gen Z</span>
                <span className="hidden sm:inline">•</span>
                <span>Premium Quality</span>
                <span className="hidden sm:inline">•</span>
                <span>Fast Shipping</span>
                <span className="hidden sm:inline">•</span>
                <span>Made by Ahmed zayed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
