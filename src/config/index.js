// Application Configuration
// All environment variables should be accessed through this file

const config = {
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
  },
  
  // Environment
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  isDevelopment: (process.env.REACT_APP_ENVIRONMENT || 'development') === 'development',
  isProduction: process.env.REACT_APP_ENVIRONMENT === 'production',
  
  // Debug settings
  debug: process.env.REACT_APP_DEBUG === 'true',
  
  // Feature flags (can be added later)
  features: {
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    enableChat: process.env.REACT_APP_ENABLE_CHAT === 'true',
  }
};

// Log configuration in development
if (config.isDevelopment) {
  console.log('App Configuration:', {
    apiUrl: config.api.baseUrl,
    environment: config.environment,
    timeout: config.api.timeout
  });
}

export default config;