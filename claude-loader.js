// Claude Assistant UI loader utility
async function loadClaudeAssistant() {
  try {
    console.log('Loading Claude Assistant UI...');
    
    // Create Claude assistant container if it doesn't exist
    let claudeContainer = document.getElementById('claude-container');
    if (!claudeContainer) {
      claudeContainer = document.createElement('div');
      claudeContainer.id = 'claude-container';
      document.body.appendChild(claudeContainer);
    }
    
    // Load Claude assistant UI
    claudeContainer.innerHTML = `
      <div id="claude-assistant" class="claude-assistant-widget">
        <!-- Claude Toggle Button -->
        <button id="claude-toggle" class="claude-toggle" aria-label="Open Claude Assistant">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span class="claude-tooltip">Ask Claude</span>
        </button>
        
        <!-- Claude Chat Panel -->
        <div id="claude-panel" class="claude-panel">
          <div class="claude-header">
            <h3>CoherIQs Assistant</h3>
            <button id="claude-close" class="claude-close" aria-label="Close Assistant">×</button>
          </div>
          
          <div class="claude-content">
            <div id="claude-messages" class="claude-messages">
              <div class="claude-message claude-system">
                <p>Hello! I'm Claude, your AI assistant for the CoherIQs website. I can help you understand wavelet coherence, navigate the site, and answer technical questions.</p>
                <div class="claude-suggestions" id="claude-suggestions"></div>
              </div>
            </div>
            
            <div class="claude-input-area">
              <div class="claude-input-container">
                <textarea 
                  id="claude-input" 
                  placeholder="Ask me about wavelet coherence, navigation, or anything else..."
                  rows="2"
                ></textarea>
                <button id="claude-send" class="claude-send" aria-label="Send message">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
              <div class="claude-status" id="claude-status"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    console.log('Claude Assistant UI loaded');
    
    // Add UI functionality and connect to claude-utils
    addClaudeUIFunctionality();
    
  } catch (error) {
    console.error('Error loading Claude Assistant UI:', error);
    // Fallback - still create basic UI structure
    const claudeContainer = document.getElementById('claude-container') || document.createElement('div');
    claudeContainer.id = 'claude-container';
    claudeContainer.innerHTML = `
      <div class="claude-assistant-widget">
        <button class="claude-toggle" onclick="alert('Claude Assistant temporarily unavailable')">
          <span>Claude Assistant</span>
        </button>
      </div>
    `;
    if (!document.getElementById('claude-container')) {
      document.body.appendChild(claudeContainer);
    }
  }
}

// Add Claude UI functionality and connect to claude-utils
function addClaudeUIFunctionality() {
  console.log('Adding Claude UI functionality...');
  
  // Get UI elements
  const toggle = document.getElementById('claude-toggle');
  const panel = document.getElementById('claude-panel');
  const closeBtn = document.getElementById('claude-close');
  const sendBtn = document.getElementById('claude-send');
  const input = document.getElementById('claude-input');
  const messages = document.getElementById('claude-messages');
  const status = document.getElementById('claude-status');
  const suggestions = document.getElementById('claude-suggestions');
  
  if (!toggle || !panel) {
    console.error('Claude Assistant UI elements not found');
    return;
  }
  
  // Get Claude assistant instance from claude-utils
  let claudeAssistant = null;
  
  function connectToAssistant() {
    if (window.coheriqsAssistant) {
      claudeAssistant = window.coheriqsAssistant;
      console.log('✅ Connected to CoherIQs Assistant from claude-utils');
      return true;
    } else {
      console.warn('⚠️ CoherIQs Assistant not available - claude-utils.js may not be loaded');
      return false;
    }
  }
  
  // Try to connect immediately
  let connected = connectToAssistant();
  
  // If not connected, set up a periodic check
  if (!connected) {
    const checkInterval = setInterval(() => {
      if (connectToAssistant()) {
        clearInterval(checkInterval);
        // Reload suggestions now that assistant is available
        loadInitialSuggestions();
        console.log('🔄 Updated suggestions with real assistant data');
      }
    }, 500);
    
    // Stop checking after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      if (!claudeAssistant) {
        console.log('⏰ Stopped looking for assistant - using fallback mode');
      }
    }, 10000);
  }
  
  // Load initial suggestions from claude-utils
  loadInitialSuggestions();
  
  // Toggle panel visibility
  function togglePanel(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Claude panel toggle clicked');
    
    const isVisible = panel.classList.contains('claude-panel-visible');
    if (isVisible) {
      panel.classList.remove('claude-panel-visible');
      toggle.classList.remove('claude-toggle-active');
    } else {
      panel.classList.add('claude-panel-visible');
      toggle.classList.add('claude-toggle-active');
      input.focus();
    }
  }
  
  // Close panel
  function closePanel(e) {
    e.preventDefault();
    e.stopPropagation();
    panel.classList.remove('claude-panel-visible');
    toggle.classList.remove('claude-toggle-active');
  }
  
  // Send message to Claude (via claude-utils)
  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message to chat UI
    addMessageToUI('user', message);
    input.value = '';
    
    // Show loading status in UI
    updateStatus('Claude is thinking...', 'loading');
    
    try {
      let response;
      if (claudeAssistant) {
        // Use the Claude assistant from claude-utils
        response = await claudeAssistant.askQuestion(message);
      } else {
        // Basic fallback when claude-utils not available
        response = {
          response: "I'm currently not fully connected. Please ensure claude-utils.js is loaded for full functionality.",
          suggestions: []
        };
      }
      
      // Add Claude's response to chat UI
      addMessageToUI('claude', response.response, response.suggestions);
      
      // Clear status
      updateStatus('', '');
      
    } catch (error) {
      console.error('Error getting Claude response:', error);
      addMessageToUI('claude', 'Sorry, I encountered an error. Please try again.');
      updateStatus('Error occurred', 'error');
      setTimeout(() => updateStatus('', ''), 3000);
    }
  }
  
  // Add message to chat UI
  function addMessageToUI(sender, message, suggestions = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `claude-message claude-${sender}`;
    
    const messageContent = document.createElement('p');
    messageContent.textContent = message;
    messageDiv.appendChild(messageContent);
    
    // Add page suggestions if provided
    if (suggestions && suggestions.length > 0) {
      const suggestionsDiv = document.createElement('div');
      suggestionsDiv.className = 'claude-suggestions';
      suggestionsDiv.innerHTML = '<p><strong>Related pages:</strong></p>';
      
      suggestions.forEach(suggestion => {
        const suggestionBtn = document.createElement('button');
        suggestionBtn.className = 'claude-suggestion-btn';
        suggestionBtn.textContent = `${suggestion.title}: ${suggestion.reason}`;
        suggestionBtn.onclick = () => {
          window.location.href = suggestion.page;
        };
        suggestionsDiv.appendChild(suggestionBtn);
      });
      
      messageDiv.appendChild(suggestionsDiv);
    }
    
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
  }
  
  // Update status display
  function updateStatus(text, type) {
    status.textContent = text;
    status.className = `claude-status${type ? ` claude-${type}` : ''}`;
  }
  
  // Load initial suggestions from claude-utils
  function loadInitialSuggestions() {
    if (!claudeAssistant) {
      // Fallback suggestions when claude-utils not available
      suggestions.innerHTML = `
        <p><strong>Try asking:</strong></p>
        <button class="claude-suggestion-btn" onclick="document.getElementById('claude-input').value='What is wavelet coherence?'">What is wavelet coherence?</button>
        <button class="claude-suggestion-btn" onclick="document.getElementById('claude-input').value='How does this compare to traditional methods?'">How does this compare to traditional methods?</button>
        <button class="claude-suggestion-btn" onclick="document.getElementById('claude-input').value='What are the applications?'">What are the applications?</button>
      `;
      return;
    }
    
    // Get page-specific suggestions from claude-utils
    const suggestedQuestions = claudeAssistant.getSuggestedQuestions();
    suggestions.innerHTML = '<p><strong>Try asking:</strong></p>';
    
    suggestedQuestions.forEach(question => {
      const btn = document.createElement('button');
      btn.className = 'claude-suggestion-btn';
      btn.textContent = question;
      btn.onclick = () => {
        input.value = question;
        input.focus();
      };
      suggestions.appendChild(btn);
    });
  }
  
  // Event listeners for UI interactions
  toggle.addEventListener('click', togglePanel);
  if (closeBtn) closeBtn.addEventListener('click', closePanel);
  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  
  // Input handling
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });
  }
  
  // Click outside to close panel
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target) && 
        panel.classList.contains('claude-panel-visible')) {
      closePanel(e);
    }
  });
  
  console.log('Claude UI functionality added');
}

// Add Claude UI styles
function addClaudeUIStyles() {
  const existingStyles = document.getElementById('claude-ui-styles');
  if (existingStyles) return; // Styles already added
  
  const styles = document.createElement('style');
  styles.id = 'claude-ui-styles';
  styles.textContent = `
    .claude-assistant-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .claude-toggle {
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 12px 16px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      position: relative;
    }
    
    .claude-toggle:hover {
      background: #4338ca;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
    }
    
    .claude-toggle-active {
      background: #4338ca;
    }
    
    .claude-tooltip {
      display: none;
    }
    
    .claude-panel {
      position: absolute;
      bottom: 60px;
      right: 0;
      width: 380px;
      max-width: calc(100vw - 40px);
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      max-height: 500px;
      display: flex;
      flex-direction: column;
    }
    
    .claude-panel-visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .claude-header {
      padding: 16px 20px 12px;
      border-bottom: 1px solid #f3f4f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f9fafb;
      border-radius: 12px 12px 0 0;
    }
    
    .claude-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .claude-close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #6b7280;
      padding: 4px;
      line-height: 1;
    }
    
    .claude-close:hover {
      color: #374151;
    }
    
    .claude-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .claude-messages {
      padding: 16px;
      overflow-y: auto;
      max-height: 300px;
      flex: 1;
    }
    
    .claude-message {
      margin-bottom: 16px;
    }
    
    .claude-message p {
      margin: 0 0 8px 0;
      line-height: 1.5;
      font-size: 14px;
    }
    
    .claude-user {
      text-align: right;
    }
    
    .claude-user p {
      background: #4f46e5;
      color: white;
      padding: 8px 12px;
      border-radius: 12px 12px 4px 12px;
      display: inline-block;
      max-width: 80%;
    }
    
    .claude-claude p {
      background: #f3f4f6;
      color: #374151;
      padding: 8px 12px;
      border-radius: 12px 12px 12px 4px;
      display: inline-block;
      max-width: 80%;
    }
    
    .claude-system p {
      background: #eff6ff;
      color: #1e40af;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
    }
    
    .claude-suggestions {
      margin-top: 8px;
    }
    
    .claude-suggestions p {
      font-size: 12px;
      margin: 0 0 8px 0;
      font-weight: 500;
      color: #6b7280;
    }
    
    .claude-suggestion-btn {
      background: #f3f4f6;
      border: none;
      padding: 6px 12px;
      margin: 4px 4px 4px 0;
      border-radius: 16px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s;
      display: inline-block;
    }
    
    .claude-suggestion-btn:hover {
      background: #e5e7eb;
    }
    
    .claude-input-area {
      padding: 16px;
      border-top: 1px solid #f3f4f6;
    }
    
    .claude-input-container {
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }
    
    .claude-input-container textarea {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      padding: 8px 12px;
      resize: none;
      font-size: 14px;
      line-height: 1.4;
      min-height: 36px;
      max-height: 120px;
    }
    
    .claude-input-container textarea:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }
    
    .claude-send {
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
    }
    
    .claude-send:hover {
      background: #4338ca;
    }
    
    .claude-status {
      font-size: 12px;
      margin-top: 8px;
      min-height: 16px;
    }
    
    .claude-loading {
      color: #6b7280;
    }
    
    .claude-error {
      color: #dc2626;
    }
    
    @media (max-width: 480px) {
      .claude-assistant-widget {
        right: 10px;
        bottom: 10px;
      }
      
      .claude-panel {
        width: calc(100vw - 20px);
        right: -10px;
      }
    }
  `;
  
  document.head.appendChild(styles);
}

// Load Claude UI when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Add styles first
  addClaudeUIStyles();
  
  // Wait for claude-utils.js to initialize the assistant with retries
  function waitForAssistant(retries = 5, delay = 300) {
    setTimeout(() => {
      if (window.coheriqsAssistant) {
        console.log('🎯 Found CoherIQs Assistant - loading UI...');
        loadClaudeAssistant();
      } else if (retries > 0) {
        console.log(`⏳ Waiting for CoherIQs Assistant... (${retries} retries left)`);
        waitForAssistant(retries - 1, delay);
      } else {
        console.warn('⚠️ CoherIQs Assistant not found after waiting - loading UI with fallback');
        loadClaudeAssistant();
      }
    }, delay);
  }
  
  // Start waiting for the assistant
  waitForAssistant();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadClaudeAssistant,
    addClaudeUIFunctionality,
    addClaudeUIStyles
  };
}
