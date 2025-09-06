// Mock Mode Configuration
// This file controls whether to use mock data or API calls

// Set to true to use mock data, false to use API calls
export const USE_MOCK_DATA = true;

// Mock data configuration
export const MOCK_CONFIG = {
  // Simulate API delay (in milliseconds)
  API_DELAY: 500,
  
  // Simulate loading states
  ENABLE_LOADING_STATES: true,
  
  // Simulate errors (for testing)
  SIMULATE_ERRORS: false,
  ERROR_RATE: 0.1, // 10% chance of error
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms = MOCK_CONFIG.API_DELAY) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to simulate random errors
export const shouldSimulateError = () => {
  if (!MOCK_CONFIG.SIMULATE_ERRORS) return false;
  return Math.random() < MOCK_CONFIG.ERROR_RATE;
};

// Mock API response wrapper
export const mockApiResponse = async (data, options = {}) => {
  const { delay = MOCK_CONFIG.API_DELAY, shouldError = false } = options;
  
  await simulateApiDelay(delay);
  
  if (shouldError || shouldSimulateError()) {
    throw new Error('Mock API Error: Simulated error for testing');
  }
  
  return data;
};

// Environment-based mock mode
export const getMockMode = () => {
  // Check environment variable first
  if (process.env.REACT_APP_USE_MOCK_DATA !== undefined) {
    return process.env.REACT_APP_USE_MOCK_DATA === 'true';
  }
  
  // Fallback to configuration
  return USE_MOCK_DATA;
};

// Check if we should use mock data
export const isMockMode = () => {
  return getMockMode();
};
