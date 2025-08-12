/**
 * Public Configuration for CoherIQs Frontend
 * This file contains configuration that can be safely exposed to the browser
 */

// API Configuration
const API_CONFIG = {
  // Claude API endpoints
  claude: {
    // Direct API (requires API key - use only with proxy)
    directEndpoint: 'https://api.anthropic.com/v1/messages',
    
    // Proxy endpoints (recommended for production)
    proxyEndpoint: '/api/claude',
    
    // Alternative proxy endpoints
    alternativeProxies: [
      '/api/ai/chat',
      '/claude-proxy',
      'https://your-backend.herokuapp.com/api/claude'
    ],
    
    // Model configuration
    model: 'claude-3-haiku-20240307',
    maxTokens: 1000,
    temperature: 0.7,
    anthropicVersion: '2023-06-01'
  }
};

// Application Configuration
const APP_CONFIG = {
  // App metadata
  name: 'CoherIQs Assistant',
  version: '1.0.0',
  
  // Feature flags
  features: {
    enableClaudeAssistant: true,
    enableOfflineMode: true,
    enableAnalytics: false,
    debugMode: false
  },
  
  // UI Configuration
  ui: {
    theme: 'light',
    showWelcomeMessage: true,
    maxChatHistory: 50,
    autoCloseDelay: 300000, // 5 minutes
    animationDuration: 300
  },
  
  // Performance settings
  performance: {
    lazyLoadDelay: 100,
    debounceInputMs: 300,
    maxRetries: 3,
    timeoutMs: 30000
  }
};

// Environment-specific overrides
const ENVIRONMENT_CONFIG = {
  development: {
    features: {
      debugMode: true,
      enableAnalytics: false
    },
    claude: {
      useDirectAPI: false,  // Use Vercel function even in development
      proxyEndpoint: 'https://noshore5-github-io.vercel.app/api/claude'
    }
  },
  
  production: {
    features: {
      debugMode: false,
      enableAnalytics: true
    },
    claude: {
      useDirectAPI: false,  // Use Vercel function instead of direct API
      proxyEndpoint: '/api/claude'  // Vercel function endpoint
    },
    performance: {
      timeoutMs: 15000
    }
  },
  
  github_pages: {
    // GitHub Pages with Vercel function
    claude: {
      useDirectAPI: false,  // Use Vercel function proxy
      proxyEndpoint: 'https://noshore5-github-io.vercel.app/api/claude', // Your working Vercel URL
      fallbackMode: false   // Disable fallback since we have API access
    },
    features: {
      enableOfflineMode: true,
      debugMode: false
    }
  }
};

// Detect environment
function detectEnvironment() {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  } else if (hostname.includes('github.io')) {
    return 'github_pages';
  } else {
    return 'production';
  }
}

// Merge configurations
function createConfig() {
  const env = detectEnvironment();
  const envConfig = ENVIRONMENT_CONFIG[env] || {};
  
  // Start with base configurations
  const config = {
    api: { ...API_CONFIG },
    app: { ...APP_CONFIG },
    environment: env
  };
  
  // Merge environment-specific overrides
  if (envConfig.claude) {
    config.api.claude = { ...config.api.claude, ...envConfig.claude };
  }
  
  if (envConfig.features) {
    config.app.features = { ...config.app.features, ...envConfig.features };
  }
  
  if (envConfig.performance) {
    config.app.performance = { ...config.app.performance, ...envConfig.performance };
  }
  
  if (envConfig.ui) {
    config.app.ui = { ...config.app.ui, ...envConfig.ui };
  }
  
  return config;
}

// Export the final configuration
const CONFIG = createConfig();

// Console logging for development
if (CONFIG.app.features.debugMode) {
  console.log('🔧 CoherIQs Base Config loaded');
  console.log('Environment detected:', CONFIG.environment);
  console.log('Claude API config:', {
    directEndpoint: CONFIG.api.claude.directEndpoint,
    useDirectAPI: CONFIG.api.claude.useDirectAPI,
    hasApiKey: !!CONFIG.api.claude.apiKey,
    proxyEndpoint: CONFIG.api.claude.proxyEndpoint
  });
  console.log('App features:', CONFIG.app.features);
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

if (typeof window !== 'undefined') {
  window.COHERIQS_CONFIG = CONFIG;
}

// Also export individual pieces for convenience
if (typeof window !== 'undefined') {
  window.API_CONFIG = CONFIG.api;
  window.APP_CONFIG = CONFIG.app;
}
