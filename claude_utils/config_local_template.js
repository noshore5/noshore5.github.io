/**
 * Local Development Configuration for CoherIQs Frontend
 * This file is for local development only and should be included in .gitignore
 * 
 * WARNING: Never commit API keys to version control!
 * This file demonstrates the structure but should contain your actual keys
 */

// Local development overrides
const LOCAL_CONFIG = {
  // API Configuration for local development
  api: {
    claude: {
      // For local development, you can use direct API calls
      useDirectAPI: true,
      
      // Your actual Claude API key (keep this secret!)
      // Replace with your real API key for local development
      apiKey: 'sk-ant-api03-YOUR-ACTUAL-KEY-HERE',
      
      // Local proxy endpoint if you're running a local server
      proxyEndpoint: 'http://localhost:3000/api/claude',
      
      // Faster timeout for local development
      timeoutMs: 10000
    }
  },
  
  // App configuration for local development
  app: {
    features: {
      debugMode: true,
      enableAnalytics: false,
      enableOfflineMode: true
    },
    
    ui: {
      showWelcomeMessage: true,
      maxChatHistory: 100 // More history in development
    },
    
    performance: {
      debounceInputMs: 100, // Faster response in development
      maxRetries: 5
    }
  }
};

// Function to apply local config
function applyLocalConfig(baseConfig) {
  // Deep merge local config with base config
  const mergedConfig = JSON.parse(JSON.stringify(baseConfig));
  
  // Merge API config
  if (LOCAL_CONFIG.api) {
    Object.assign(mergedConfig.api, LOCAL_CONFIG.api);
    if (LOCAL_CONFIG.api.claude) {
      Object.assign(mergedConfig.api.claude, LOCAL_CONFIG.api.claude);
    }
  }
  
  // Merge app config
  if (LOCAL_CONFIG.app) {
    if (LOCAL_CONFIG.app.features) {
      Object.assign(mergedConfig.app.features, LOCAL_CONFIG.app.features);
    }
    if (LOCAL_CONFIG.app.ui) {
      Object.assign(mergedConfig.app.ui, LOCAL_CONFIG.app.ui);
    }
    if (LOCAL_CONFIG.app.performance) {
      Object.assign(mergedConfig.app.performance, LOCAL_CONFIG.app.performance);
    }
  }
  
  return mergedConfig;
}

// Apply local configuration if we're in development
if (typeof window !== 'undefined' && window.COHERIQS_CONFIG) {
  // Check if we're in development environment
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.protocol === 'file:';
  
  if (isDevelopment) {
    window.COHERIQS_CONFIG = applyLocalConfig(window.COHERIQS_CONFIG);
    window.API_CONFIG = window.COHERIQS_CONFIG.api;
    window.APP_CONFIG = window.COHERIQS_CONFIG.app;
    
    console.log('✓ Local config applied for development');
    console.log('Local API Config:', window.API_CONFIG.claude);
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LOCAL_CONFIG,
    applyLocalConfig
  };
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Copy this file to config_local.js
 * 2. Add config_local.js to your .gitignore file
 * 3. Replace 'sk-ant-api03-YOUR-ACTUAL-KEY-HERE' with your real Claude API key
 * 4. Adjust any other settings for your local development needs
 * 
 * SECURITY NOTES:
 * 
 * - Never commit API keys to version control
 * - For production deployments, use environment variables or secure key management
 * - Consider using a proxy server to hide API keys from the frontend
 * - The direct API approach should only be used in development
 */
