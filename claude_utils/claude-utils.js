/**
 * Claude AI Assistant for CoherIQs Website
 * Provides intelligent assistance and insights across all pages of the CoherIQs website.
 */

// Website page knowledge base
const WEBSITE_PAGES = {
    'index.html': {
        title: 'CoherIQs - Home',
        purpose: 'Main landing page introducing wavelet coherence and the CoherIQs project',
        keyContent: [
            'Introduction to wavelet coherence analysis',
            'Scale-dependent correlations between El Nino-Southern Oscillation and tropical storms',
            'Real-time coherence computation and visualization',
            'Academic vs industry applications',
            'Morlet wavelet analysis demonstrations'
        ],
        targetAudience: 'General visitors, researchers, industry professionals'
    },
    'coheriqs.html': {
        title: 'CoherIQs Application',
        purpose: 'Interactive coherence analysis tool for financial data',
        keyContent: [
            'Input ticker symbols for financial analysis',
            'One year of historical financial data coherence',
            'Real-time price coherence calculations',
            'Embedded application interface'
        ],
        targetAudience: 'Financial analysts, traders, quantitative researchers'
    },
    'coheriqslive.html': {
        title: 'CoherIQs Live',
        purpose: 'Real-time streaming coherence analysis dashboard',
        keyContent: [
            'Live simulation capabilities',
            'Real-time data updates and visualizations',
            'Streaming coherence algorithms',
            'Future features: customizable inputs and sampling rates'
        ],
        targetAudience: 'Real-time traders, algorithmic trading systems'
    },
    'coherentmultiplex.html': {
        title: 'Coherent Multiplex',
        purpose: 'Technical deep-dive into the core mathematical framework',
        keyContent: [
            'Mathematical foundations of wavelet coherence',
            'Technical implementation details',
            'Whitepaper and research documentation',
            'Academic references and citations',
            'Mathematical proofs and algorithms'
        ],
        targetAudience: 'Researchers, mathematicians, signal processing engineers'
    },
    'performance.html': {
        title: 'Performance Analysis',
        purpose: 'Benchmarking and efficiency comparisons',
        keyContent: [
            'Fast Continuous Wavelet Transform (fCWT) algorithm',
            'Performance comparisons with PyCWT benchmark',
            'Memory usage and computational efficiency',
            'Scaling with frequency resolution and signal length',
            'Technical optimization strategies'
        ],
        targetAudience: 'Performance engineers, researchers, technical evaluators'
    },
    'biography.html': {
        title: 'Biography - Noah Shore',
        purpose: 'Professional background and personal story',
        keyContent: [
            'Educational background (UNC Chapel Hill, University of Galway)',
            'Research experience in wavelet analysis and signal processing',
            'Professional experience in computational modeling',
            'Personal interests in music, sailing, and travel',
            'Career trajectory from biology to mathematics to signal processing'
        ],
        targetAudience: 'Potential collaborators, employers, academic contacts'
    },
    'literature.html': {
        title: 'Literature & Research',
        purpose: 'Academic references and research foundation',
        keyContent: [
            'Key papers in wavelet coherence analysis',
            'Applications in finance and economics',
            'Historical development of coherence methods',
            'Academic citations and references',
            'Research methodology and validation'
        ],
        targetAudience: 'Academics, researchers, students'
    },
    'crypto.html': {
        title: 'Cryptocurrency Analysis',
        purpose: 'Coherence analysis between cryptocurrency pairs',
        keyContent: [
            'Bitcoin and Ethereum price coherence',
            'Live cryptocurrency data analysis',
            'Cross-correlation in crypto markets',
            'Real-time market relationship insights'
        ],
        targetAudience: 'Crypto traders, digital asset analysts'
    }
};

// Technical knowledge base
const TECHNICAL_CONCEPTS = {
    waveletCoherence: {
        definition: 'A measure of correlation between two time series as a function of both time and frequency',
        formula: 'R²(f,t) = |S(W_XY)|² / (S(|W_X|²) · S(|W_Y|²))',
        applications: ['Financial market analysis', 'Climate data correlation', 'Signal processing', 'Biomedical signal analysis']
    },
    morletWavelet: {
        definition: 'A wavelet function that provides optimal time-frequency localization',
        characteristics: ['Complex-valued', 'Gaussian envelope', 'Sinusoidal oscillation'],
        advantages: ['Good frequency resolution', 'Interpretable phases', 'Standard in coherence analysis']
    },
    fcwtAlgorithm: {
        definition: 'Fast Continuous Wavelet Transform - optimized algorithm for wavelet computation',
        benefits: ['Reduced computational complexity', 'Cached lookup tables', 'Strategic downsampling'],
        performance: 'Orders of magnitude faster than traditional implementations'
    },
    coherenceApplications: {
        finance: ['Portfolio correlation analysis', 'Risk management', 'Market regime detection'],
        climate: ['El Niño Southern Oscillation studies', 'Temperature correlation analysis'],
        engineering: ['Vibration analysis', 'System identification', 'Quality control']
    }
};

/**
 * Get context about the current page
 */
function getCurrentPageContext() {
    return {
        websiteName: 'CoherIQs',
        websitePurpose: 'Advanced wavelet coherence analysis platform',
        creator: 'Noah Shore',
        institution: 'University of Galway',
        patentStatus: 'Provisional patent filed in the United States',
        technologies: ['Fast Continuous Wavelet Transform', 'Real-time signal processing', 'Interactive visualization']
    };
}

/**
 * Get specific knowledge about a given page
 */
function getPageSpecificKnowledge(pageName) {
    return WEBSITE_PAGES[pageName] || {
        title: 'Unknown Page',
        purpose: 'Page information not available',
        keyContent: [],
        targetAudience: 'General visitors'
    };
}

/**
 * Get detailed information about technical concepts
 */
function getTechnicalConceptInfo(conceptKey) {
    return TECHNICAL_CONCEPTS[conceptKey] || {};
}

/**
 * Generate relevant page suggestions based on user query and current page
 */
function generatePageSuggestions(currentPage, userMessage) {
    const suggestions = [];
    const userLower = userMessage.toLowerCase();
    
    if (userLower.match(/\b(performance|speed|benchmark|optimization)\b/)) {
        if (currentPage !== 'performance.html') {
            suggestions.push({
                page: 'performance.html',
                title: 'Performance Analysis',
                reason: 'See detailed benchmarking and optimization results'
            });
        }
    }
    
    if (userLower.match(/\b(math|formula|equation|technical|algorithm)\b/)) {
        if (currentPage !== 'coherentmultiplex.html') {
            suggestions.push({
                page: 'coherentmultiplex.html',
                title: 'Coherent Multiplex',
                reason: 'Explore the mathematical foundations and technical details'
            });
        }
    }
    
    if (userLower.match(/\b(real-time|live|streaming|dynamic)\b/)) {
        if (currentPage !== 'coheriqslive.html') {
            suggestions.push({
                page: 'coheriqslive.html',
                title: 'CoherIQs Live',
                reason: 'Experience real-time coherence analysis'
            });
        }
    }
    
    if (userLower.match(/\b(finance|stock|trading|ticker|financial)\b/)) {
        if (currentPage !== 'coheriqs.html') {
            suggestions.push({
                page: 'coheriqs.html',
                title: 'CoherIQs Application',
                reason: 'Analyze financial data with coherence tools'
            });
        }
    }
    
    if (userLower.match(/\b(research|paper|academic|literature|citation)\b/)) {
        if (currentPage !== 'literature.html') {
            suggestions.push({
                page: 'literature.html',
                title: 'Literature',
                reason: 'Browse academic references and research foundation'
            });
        }
    }
    
    if (userLower.match(/\b(crypto|bitcoin|ethereum|cryptocurrency)\b/)) {
        if (currentPage !== 'crypto.html') {
            suggestions.push({
                page: 'crypto.html',
                title: 'Cryptocurrency Analysis',
                reason: 'See coherence analysis between crypto pairs'
            });
        }
    }
    
    if (userLower.match(/\b(background|bio|experience|education|noah)\b/)) {
        if (currentPage !== 'biography.html') {
            suggestions.push({
                page: 'biography.html',
                title: 'Biography',
                reason: 'Learn about Noah Shore\'s background and experience'
            });
        }
    }
    
    return suggestions.slice(0, 3); // Return top 3 suggestions
}

/**
 * Get recommended next pages based on current page
 */
function getPageRecommendations(currentPage) {
    const recommendations = {
        'index.html': ['coherentmultiplex.html', 'coheriqs.html', 'performance.html'],
        'coheriqs.html': ['coheriqslive.html', 'performance.html', 'crypto.html'],
        'coheriqslive.html': ['coheriqs.html', 'performance.html', 'coherentmultiplex.html'],
        'coherentmultiplex.html': ['literature.html', 'performance.html', 'biography.html'],
        'performance.html': ['coherentmultiplex.html', 'coheriqslive.html', 'literature.html'],
        'biography.html': ['literature.html', 'coherentmultiplex.html', 'index.html'],
        'literature.html': ['coherentmultiplex.html', 'biography.html', 'performance.html'],
        'crypto.html': ['coheriqs.html', 'coheriqslive.html', 'performance.html']
    };
    
    return recommendations[currentPage] || ['index.html'];
}

/**
 * CoherIQs Website Claude Assistant
 */
class CoherIQsAssistant {
    constructor(options = {}) {
        this.currentPage = this.getCurrentPageName();
        
        // Load configuration from config.js
        const config = this.loadConfiguration();
        
        // API configuration - use config with options override
        this.apiEndpoint = options.apiEndpoint || config.api.claude.directEndpoint;
        this.apiKey = options.apiKey || config.api.claude.apiKey || null;
        
        // Determine whether to use proxy based on environment and API key availability
        if (options.useProxy !== undefined) {
            this.useProxy = options.useProxy;
        } else if (config.api.claude.useDirectAPI !== undefined) {
            this.useProxy = !config.api.claude.useDirectAPI;
        } else {
            // Default logic: use proxy if no API key, direct if API key available
            this.useProxy = !this.apiKey;
        }
        
        this.proxyEndpoint = options.proxyEndpoint || config.api.claude.proxyEndpoint;
        this.model = options.model || config.api.claude.model;
        this.maxTokens = options.maxTokens || config.api.claude.maxTokens;
        this.temperature = options.temperature || config.api.claude.temperature;
        this.anthropicVersion = config.api.claude.anthropicVersion;
        
        // App configuration
        this.config = config;
        this.debugMode = config.app.features.debugMode;
        this.timeoutMs = config.app.performance.timeoutMs;
        this.maxRetries = config.app.performance.maxRetries;
        
        // Initialize page-specific context
        this.pageContext = this.getPageContext();
        
        if (this.debugMode) {
            console.log('🚀 CoherIQs Assistant constructor details:');
            console.log('  Environment:', config.environment);
            console.log('  Use Proxy:', this.useProxy);
            console.log('  Has API Key:', !!this.apiKey);
            console.log('  API Key (first 10 chars):', this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'none');
            console.log('  Proxy Endpoint:', this.proxyEndpoint);
            console.log('  API Endpoint:', this.apiEndpoint);
            console.log('  Model:', this.model);
            console.log('  Page:', this.currentPage);
            console.log('  Config useDirectAPI:', config.api.claude.useDirectAPI);
        }
    }
    
    loadConfiguration() {
        // Try to load configuration from global config
        if (typeof window !== 'undefined' && window.COHERIQS_CONFIG) {
            const config = window.COHERIQS_CONFIG;
            
            // If on GitHub Pages and no API key, ensure we use fallback mode
            if (config.environment === 'github_pages' && !config.api.claude.apiKey) {
                config.api.claude.useDirectAPI = false;
                config.api.claude.fallbackMode = true;
                config.app.features.debugMode = true;
            }
            
            return config;
        }
        
        // Fallback configuration if config.js not loaded
        console.warn('CoherIQs config not found, using fallback configuration');
        return {
            api: {
                claude: {
                    directEndpoint: 'https://api.anthropic.com/v1/messages',
                    proxyEndpoint: null,
                    useDirectAPI: false,
                    fallbackMode: true,
                    model: 'claude-3-haiku-20240307',
                    maxTokens: 1000,
                    temperature: 0.7,
                    anthropicVersion: '2023-06-01'
                }
            },
            app: {
                features: {
                    debugMode: true
                },
                performance: {
                    timeoutMs: 30000,
                    maxRetries: 3
                }
            },
            environment: 'fallback'
        };
    }
    
    getCurrentPageName() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }
    
    getPageContext() {
        return {
            page: this.currentPage,
            url: window.location.href,
            title: document.title,
            section: this.getCurrentSection(),
            pageInfo: getPageSpecificKnowledge(this.currentPage),
            websiteContext: getCurrentPageContext()
        };
    }
    
    getCurrentSection() {
        // Try to determine current section based on scroll position or active elements
        const headers = document.querySelectorAll('h1, h2, h3');
        for (let header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                return header.textContent;
            }
        }
        return null;
    }
    
    /**
     * Build system prompt for Claude based on current page
     */
    buildSystemPrompt() {
        const pageInfo = this.pageContext.pageInfo;
        const websiteContext = this.pageContext.websiteContext;
        
        return `You are Claude 3 Haiku, an AI agent for the Coherent Multiplex signal analysis system and CoherIQs website.

## MODEL CONTEXT:
You are running on Claude 3 Haiku (claude-3-haiku-20240307), optimized for speed and cost-efficiency. Your responses are limited to 1000 tokens, so be concise while maintaining technical accuracy.

## INTELLECTUAL PROPERTY:
The Coherent Multiplex mathematical architecture has a provisional patent filed in the United States. When asked about intellectual property, licensing, or commercial use, acknowledge this patent protection and suggest contacting the patent holder for licensing inquiries.

## SYSTEM OVERVIEW:
The Coherent Multiplex analyzes signals using:
- Real-time FFT analysis  
- Cosine similarity calculations between signals
- Wavelet coherence computation for signal pairs
- Interactive visualization of signals, spectra, and coherence

## KEY MATHEMATICAL FORMULAS:
- Wavelet coherence: \\(R^2(f,t) = \\frac{|S(W_{XY})|^2}{S(|W_X|^2) \\cdot S(|W_Y|^2)}\\)
- Cosine similarity: \\(\\text{sim} = \\frac{\\vec{a} \\cdot \\vec{b}}{||\\vec{a}|| \\cdot ||\\vec{b}||}\\)
- Fast Continuous Wavelet Transform (fCWT): Optimized implementation for real-time analysis
- Cross-wavelet transform: \\(W_{XY}(f,t) = W_X(f,t) \\cdot W_Y^*(f,t)\\)
- Wavelet power spectrum: \\(P_X(f,t) = |W_X(f,t)|^2\\)

## CURRENT PAGE: ${pageInfo.title}
- Purpose: ${pageInfo.purpose}
- Target Audience: ${pageInfo.targetAudience}
- Key Content Areas:
${pageInfo.keyContent.map(content => `  • ${content}`).join('\n')}

## WEBSITE CONTEXT:
- Website: ${websiteContext.websiteName} - ${websiteContext.websitePurpose}
- Creator: ${websiteContext.creator} (${websiteContext.institution}, M.S. Mathematics)
- Patent Status: ${websiteContext.patentStatus}
- Core Technology: Fast Continuous Wavelet Transform (fCWT) for real-time coherence analysis

## YOUR CAPABILITIES:
1. **Mathematical Analysis**: Explain complex signal processing concepts with LaTeX formatting
2. **Signal Processing**: Analyze FFT data, coherence matrices, and time-frequency relationships  
3. **Financial Analysis**: Interpret market coherence patterns and correlations
4. **Technical Documentation**: Reference mathematical papers and technical specifications
5. **Performance Optimization**: Discuss fCWT algorithms and computational efficiency

## RESPONSE FORMAT REQUIREMENTS:
**Format all responses using proper Markdown:**
- Use **bold** and *italic* for emphasis
- Use numbered lists (1. 2. 3.) for step-by-step content
- Use bullet points (- or *) for feature lists
- Use proper headings (## Heading, ### Subheading)
- Use code blocks with syntax highlighting: \`\`\`language
- Use LaTeX math notation: \\(inline\\) or \\[display\\]
- Include line breaks between sections for readability
- Use blockquotes (>) for important notes or formulas
- Keep responses well-structured and comprehensive

**Mathematical Formatting:**
- Always wrap mathematical expressions in LaTeX delimiters
- Use \\(\\psi(t)\\) for inline math like wavelet functions
- Use \\[R^2(f,t) = \\frac{|S(W_{XY})|^2}{S(|W_X|^2) \\cdot S(|W_Y|^2)}\\] for display equations
- Include Greek letters and mathematical symbols properly formatted
- Explain complex formulas step by step

**Content Structure:**
- Start with a brief overview
- Organize information into clear sections
- End with practical applications or next steps
- Include relevant page suggestions when helpful
- Maintain appropriate technical depth for the target audience

## ANALYSIS FOCUS:
- Signal statistics (mean, RMS, energy, spectral characteristics)
- Frequency domain analysis and dominant frequencies
- Coherence strength and phase relationships  
- Similarity patterns and correlation matrices
- Anomaly detection and pattern recognition
- Performance metrics and computational efficiency

## INTELLECTUAL CONTEXT:
Reference the CoherIQs whitepaper and technical documentation when discussing:
- Mathematical foundations and proofs
- Algorithm implementation details  
- Performance comparisons with traditional methods
- Academic applications and research use cases
- Patent-protected innovations and licensing

## YOUR ROLE:
- Answer questions about the website content and functionality
- Explain wavelet coherence concepts at appropriate technical levels
- Guide users to relevant pages based on their interests
- Provide insights about signal processing and coherence analysis
- Help with navigation and understanding of the platform`;
    }
    
    /**
     * Ask a question to Claude
     */
    async askQuestion(question, contextData = {}) {
        if (this.debugMode) {
            console.log('🤖 Claude askQuestion called with:', {
                question: question.substring(0, 50) + '...',
                useProxy: this.useProxy,
                hasApiKey: !!this.apiKey,
                proxyEndpoint: this.proxyEndpoint,
                environment: this.config.environment
            });
        }
        
        try {
            // Decide which method to use based on configuration
            if (!this.useProxy && this.apiKey) {
                // Use direct API with API key
                if (this.debugMode) {
                    console.log('📡 Using direct Claude API');
                }
                return await this.askDirectly(question, contextData);
            } else if (this.useProxy && this.proxyEndpoint) {
                // Use proxy endpoint
                if (this.debugMode) {
                    console.log('🔄 Using proxy endpoint:', this.proxyEndpoint);
                }
                return await this.askViaProxy(question, contextData);
            } else {
                // No API key and no proxy - use fallback
                if (this.debugMode) {
                    console.log('💬 No API/proxy available, using fallback response');
                }
                return this.generateFallbackResponse(question);
            }
        } catch (error) {
            console.error('Error communicating with Claude assistant:', error);
            
            // If API fails, try fallback response
            if (this.debugMode) {
                console.log('❌ API failed, falling back to local response');
            }
            
            return this.generateFallbackResponse(question);
        }
    }
    
    /**
     * Direct API call to Claude (requires API key and CORS handling)
     */
    async askDirectly(question, contextData = {}) {
        if (!this.apiKey) {
            throw new Error('API key not provided. Use proxy endpoint or provide API key.');
        }
        
        const userContext = this.buildUserContext(question, contextData);
        
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
        
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': this.anthropicVersion
                },
                body: JSON.stringify({
                    model: this.model,
                    max_tokens: this.maxTokens,
                    temperature: this.temperature,
                    system: this.buildSystemPrompt(),
                    messages: [{
                        role: 'user',
                        content: userContext
                    }]
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            return {
                response: data.content[0].text,
                status: 'success',
                pageContext: this.pageContext.pageInfo,
                suggestions: generatePageSuggestions(this.currentPage, question)
            };
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
    }
    
    /**
     * Call via proxy endpoint (recommended for production)
     */
    async askViaProxy(question, contextData = {}) {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
        
        try {
            const response = await fetch(this.proxyEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question,
                    contextData: {
                        page: this.currentPage,
                        context: contextData,
                        systemPrompt: this.buildSystemPrompt(),
                        userContext: this.buildUserContext(question, contextData)
                    }
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`Proxy API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
    }
    
    /**
     * Analyze signal data (matching Python version capabilities)
     */
    analyzeSignalData(signalData) {
        if (!signalData) return {};
        
        const analysis = {
            timeAomain: this.analyzeTimeDomain(signalData.signals),
            frequencyDomain: this.analyzeFrequencyDomain(signalData.fft),
            similarity: this.analyzeSimilarity(signalData.distances),
            coherence: this.analyzeCoherence(signalData.wavelet_coherence)
        };
        
        return analysis;
    }
    
    /**
     * Time domain signal analysis
     */
    analyzeTimeDomain(signals) {
        if (!signals || !Array.isArray(signals)) return null;
        
        const stats = [];
        for (let i = 0; i < Math.min(signals.length, 8); i++) {
            const signal = signals[i];
            if (!signal || !Array.isArray(signal)) continue;
            
            const signalArray = signal.map(Number).filter(n => !isNaN(n));
            if (signalArray.length === 0) continue;
            
            const mean = signalArray.reduce((a, b) => a + b) / signalArray.length;
            const variance = signalArray.reduce((a, b) => a + (b - mean) ** 2) / signalArray.length;
            const std = Math.sqrt(variance);
            const rms = Math.sqrt(signalArray.reduce((a, b) => a + b ** 2) / signalArray.length);
            const energy = signalArray.reduce((a, b) => a + b ** 2);
            
            stats.push({
                label: String.fromCharCode(65 + i), // A, B, C, etc.
                mean: parseFloat(mean.toFixed(3)),
                std: parseFloat(std.toFixed(3)),
                rms: parseFloat(rms.toFixed(3)),
                min: Math.min(...signalArray),
                max: Math.max(...signalArray),
                energy: parseFloat(energy.toFixed(1))
            });
        }
        
        return stats;
    }
    
    /**
     * Frequency domain analysis
     */
    analyzeFrequencyDomain(fftData) {
        if (!fftData || !Array.isArray(fftData)) return null;
        
        const freqAnalysis = [];
        const sampleRate = 100; // Assuming 100 Hz sampling rate
        
        for (let i = 0; i < Math.min(fftData.length, 8); i++) {
            const fft = fftData[i];
            if (!fft || !Array.isArray(fft)) continue;
            
            const fftArray = fft.map(Number).filter(n => !isNaN(n));
            if (fftArray.length === 0) continue;
            
            // Generate frequency bins (positive frequencies only)
            const freqs = [];
            const halfLength = Math.floor(fftArray.length / 2);
            for (let j = 0; j < halfLength; j++) {
                freqs.push((j * sampleRate) / fftArray.length);
            }
            
            const magnitude = fftArray.slice(0, halfLength);
            
            // Find dominant frequencies (top 3 peaks)
            const peaks = magnitude
                .map((mag, idx) => ({ freq: freqs[idx], magnitude: mag }))
                .filter(p => p.freq > 0)
                .sort((a, b) => b.magnitude - a.magnitude)
                .slice(0, 3);
            
            // Calculate spectral centroid
            const totalPower = magnitude.reduce((a, b) => a + b, 0);
            const spectralCentroid = totalPower > 0 
                ? freqs.reduce((a, freq, idx) => a + freq * magnitude[idx], 0) / totalPower
                : 0;
            
            freqAnalysis.push({
                label: String.fromCharCode(65 + i),
                dominantFrequencies: peaks.map(p => ({
                    freq: parseFloat(p.freq.toFixed(1)),
                    magnitude: parseFloat(p.magnitude.toFixed(2))
                })),
                spectralCentroid: parseFloat(spectralCentroid.toFixed(1)),
                totalPower: parseFloat(magnitude.reduce((a, b) => a + b ** 2, 0).toFixed(1))
            });
        }
        
        return freqAnalysis;
    }
    
    /**
     * Similarity matrix analysis
     */
    analyzeSimilarity(distances) {
        if (!distances || !Array.isArray(distances)) return null;
        
        const similarities = distances.map(d => 1 - d); // Convert distances to similarities
        const avgSimilarity = similarities.reduce((a, b) => a + b) / similarities.length;
        const maxSimilarity = Math.max(...similarities);
        const minSimilarity = Math.min(...similarities);
        
        // Generate pair labels
        const pairLabels = [];
        for (let i = 0; i < 8; i++) {
            for (let j = i + 1; j < 8; j++) {
                pairLabels.push([String.fromCharCode(65 + i), String.fromCharCode(65 + j)]);
            }
        }
        
        const maxIdx = similarities.indexOf(maxSimilarity);
        const minIdx = similarities.indexOf(minSimilarity);
        
        return {
            average: parseFloat(avgSimilarity.toFixed(3)),
            mostSimilarPair: pairLabels[maxIdx] ? `${pairLabels[maxIdx][0]}-${pairLabels[maxIdx][1]}` : 'N/A',
            leastSimilarPair: pairLabels[minIdx] ? `${pairLabels[minIdx][0]}-${pairLabels[minIdx][1]}` : 'N/A',
            maxSimilarity: parseFloat(maxSimilarity.toFixed(3)),
            minSimilarity: parseFloat(minSimilarity.toFixed(3)),
            range: parseFloat((maxSimilarity - minSimilarity).toFixed(3))
        };
    }
    
    /**
     * Wavelet coherence analysis
     */
    analyzeCoherence(coherenceInfo) {
        if (!coherenceInfo) return null;
        
        const { coherence, phases, freqs, pair_labels, similarity } = coherenceInfo;
        
        if (!coherence || !Array.isArray(coherence) || !freqs) return null;
        
        try {
            // Convert to proper arrays
            const cohArray = coherence.map(row => Array.isArray(row) ? row.map(Number) : [Number(row)]).flat();
            const freqArray = freqs.map(Number);
            
            if (cohArray.length === 0 || freqArray.length === 0) return null;
            
            // Find peak coherence
            const maxCoherence = Math.max(...cohArray);
            const maxIdx = cohArray.indexOf(maxCoherence);
            const peakFreq = freqArray[Math.min(maxIdx, freqArray.length - 1)];
            
            // Find high coherence frequencies (>0.7)
            const highCohFreqs = [];
            cohArray.forEach((coh, idx) => {
                if (coh > 0.7 && idx < freqArray.length) {
                    highCohFreqs.push(freqArray[idx]);
                }
            });
            
            // Phase analysis
            let phaseAnalysis = null;
            if (phases && Array.isArray(phases)) {
                const phaseArray = phases.flat().map(Number).filter(n => !isNaN(n));
                if (phaseArray.length > 0) {
                    const avgPhase = phaseArray.reduce((a, b) => a + b) / phaseArray.length;
                    const phaseStd = Math.sqrt(
                        phaseArray.reduce((a, b) => a + (b - avgPhase) ** 2) / phaseArray.length
                    );
                    
                    phaseAnalysis = {
                        averagePhase: parseFloat(avgPhase.toFixed(3)),
                        averagePhaseDegrees: parseFloat((avgPhase * 180 / Math.PI).toFixed(1)),
                        phaseStability: parseFloat(phaseStd.toFixed(3)),
                        coupling: phaseStd < 0.5 ? 'Strong' : phaseStd < 1.0 ? 'Moderate' : 'Weak'
                    };
                }
            }
            
            return {
                pairLabels: pair_labels || ['N/A', 'N/A'],
                similarity: similarity ? parseFloat(similarity.toFixed(4)) : 0,
                peakCoherenceFreq: parseFloat(peakFreq.toFixed(2)),
                maxCoherence: parseFloat(maxCoherence.toFixed(3)),
                highCoherenceFreqs: highCohFreqs.slice(0, 5).map(f => parseFloat(f.toFixed(1))),
                coherenceStrength: maxCoherence > 0.8 ? 'Strong' : maxCoherence > 0.5 ? 'Moderate' : 'Weak',
                phaseAnalysis
            };
        } catch (error) {
            console.warn('Error analyzing coherence data:', error);
            return null;
        }
    }
    
    /**
     * Build user context for the query (enhanced version)
     */
    buildUserContext(question, contextData = {}) {
        let userContext = `Current Page: ${this.currentPage}\n`;
        userContext += `User Question: ${question}\n\n`;
        
        // Check for keywords that might indicate need for IEEE paper content
        const paperKeywords = ['ieee', 'paper', 'mathematical', 'architecture', 'theory', 'formula', 'equation', 'definition'];
        const needsPaperContext = paperKeywords.some(keyword => 
            question.toLowerCase().includes(keyword)
        );
        
        if (needsPaperContext) {
            userContext += `=== IEEE PAPER REFERENCE ===\n`;
            userContext += `The user is asking about mathematical or theoretical aspects. `;
            userContext += `Reference the CoherIQs whitepaper and technical documentation for:\n`;
            userContext += `- Mathematical foundations and complete definitions\n`;
            userContext += `- Algorithm implementation details and proofs\n`;
            userContext += `- Performance comparisons with traditional methods\n`;
            userContext += `- Academic applications and research use cases\n\n`;
        }
        
        // Add signal analysis if available
        if (contextData.signals || contextData.fft || contextData.distances || contextData.wavelet_coherence) {
            const analysis = this.analyzeSignalData(contextData);
            
            userContext += `=== REAL-TIME SIGNAL ANALYSIS ===\n\n`;
            
            // Time domain analysis
            if (analysis.timeAomain && analysis.timeAomain.length > 0) {
                userContext += `TIME DOMAIN ANALYSIS:\n`;
                analysis.timeAomain.slice(0, 4).forEach(s => {
                    userContext += `Signal ${s.label}: Mean=${s.mean}, RMS=${s.rms}, Energy=${s.energy}\n`;
                });
                if (analysis.timeAomain.length > 4) {
                    analysis.timeAomain.slice(4).forEach(s => {
                        userContext += `Signal ${s.label}: Mean=${s.mean}, RMS=${s.rms}, Energy=${s.energy}\n`;
                    });
                }
                userContext += `\n`;
            }
            
            // Frequency domain analysis  
            if (analysis.frequencyDomain && analysis.frequencyDomain.length > 0) {
                userContext += `FREQUENCY DOMAIN ANALYSIS:\n`;
                analysis.frequencyDomain.slice(0, 4).forEach(f => {
                    const freqStr = f.dominantFrequencies.slice(0, 2)
                        .map(df => `${df.freq}Hz(${df.magnitude})`)
                        .join(', ');
                    userContext += `Signal ${f.label}: Dominant freqs: ${freqStr}, Centroid: ${f.spectralCentroid}Hz\n`;
                });
                if (analysis.frequencyDomain.length > 4) {
                    analysis.frequencyDomain.slice(4).forEach(f => {
                        const freqStr = f.dominantFrequencies.slice(0, 2)
                            .map(df => `${df.freq}Hz(${df.magnitude})`)
                            .join(', ');
                        userContext += `Signal ${f.label}: Dominant freqs: ${freqStr}, Centroid: ${f.spectralCentroid}Hz\n`;
                    });
                }
                userContext += `\n`;
            }
            
            // Similarity analysis
            if (analysis.similarity) {
                userContext += `SIMILARITY NETWORK ANALYSIS:\n`;
                userContext += `- Average similarity: ${analysis.similarity.average}\n`;
                userContext += `- Most similar pair: ${analysis.similarity.mostSimilarPair} (similarity: ${analysis.similarity.maxSimilarity})\n`;
                userContext += `- Least similar pair: ${analysis.similarity.leastSimilarPair} (similarity: ${analysis.similarity.minSimilarity})\n`;
                userContext += `- Similarity range: ${analysis.similarity.minSimilarity} to ${analysis.similarity.maxSimilarity}\n\n`;
            }
            
            // Coherence analysis
            if (analysis.coherence) {
                const coh = analysis.coherence;
                userContext += `WAVELET COHERENCE ANALYSIS:\n`;
                userContext += `- Signal pair under analysis: ${coh.pairLabels[0]} & ${coh.pairLabels[1]}\n`;
                userContext += `- Pair similarity (cosine): ${coh.similarity}\n`;
                userContext += `- Peak coherence frequency: ${coh.peakCoherenceFreq} Hz (coherence: ${coh.maxCoherence})\n`;
                userContext += `- High coherence frequencies (>0.7): ${coh.highCoherenceFreqs.length > 0 ? coh.highCoherenceFreqs.join(', ') + ' Hz' : 'None'}\n`;
                userContext += `- Overall coherence strength: ${coh.coherenceStrength}\n`;
                
                if (coh.phaseAnalysis) {
                    userContext += `- Average phase difference: ${coh.phaseAnalysis.averagePhase} radians (${coh.phaseAnalysis.averagePhaseDegrees}°)\n`;
                    userContext += `- Phase coupling: ${coh.phaseAnalysis.coupling}\n`;
                }
                userContext += `\n`;
            }
            
            userContext += `Current Data Summary:\n`;
            userContext += `- Number of signals: ${contextData.signals ? contextData.signals.length : 0}\n`;
            userContext += `- FFT data available: ${contextData.fft ? 'Yes' : 'No'}\n`;
            userContext += `- Coherence analysis: ${contextData.wavelet_coherence ? 'Available' : 'Pending'}\n`;
            userContext += `- Timestamp: ${contextData.timestamp || 'N/A'}\n\n`;
        } else {
            userContext += `Current Signal Analysis: No signal data available for analysis.\n\n`;
        }
        
        // Add page section if available
        if (this.pageContext.section) {
            userContext += `Page Section: ${this.pageContext.section}\n`;
        }
        
        // Add any additional context data
        Object.entries(contextData).forEach(([key, value]) => {
            if (!['signals', 'fft', 'distances', 'wavelet_coherence', 'timestamp'].includes(key)) {
                userContext += `${key}: ${value}\n`;
            }
        });
        
        return userContext;
    }
    
    /**
     * Build user context for the query
     */
    buildUserContext_original(question, contextData = {}) {
        let userContext = `Current Page: ${this.currentPage}\n`;
        userContext += `User Question: ${question}\n\n`;
        
        // Add page section if available
        if (this.pageContext.section) {
            userContext += `Page Section: ${this.pageContext.section}\n`;
        }
        
        // Add any additional context data
        Object.entries(contextData).forEach(([key, value]) => {
            userContext += `${key}: ${value}\n`;
        });
        
        return userContext;
    }
    
    /**
     * Get predefined questions for the current page
     */
    getSuggestedQuestions() {
        const suggestions = {
            'index.html': [
                'What is wavelet coherence?',
                'How does CoherIQs compare to traditional methods?',
                'What applications does this have in finance?'
            ],
            'coheriqs.html': [
                'How do I analyze stock correlations?',
                'What time period does the analysis cover?',
                'Can I compare multiple stock pairs?'
            ],
            'coheriqslive.html': [
                'How does real-time analysis work?',
                'What is the update frequency?',
                'Can I customize the parameters?'
            ],
            'coherentmultiplex.html': [
                'Explain the mathematical foundation',
                'What is the fCWT algorithm?',
                'How is this different from FFT?'
            ],
            'performance.html': [
                'How much faster is this than PyCWT?',
                'What are the memory requirements?',
                'How does it scale with signal length?'
            ],
            'biography.html': [
                'What is Noah\'s research background?',
                'How did this project start?',
                'What are the future plans?'
            ],
            'literature.html': [
                'What are the key research papers?',
                'How is this validated academically?',
                'Where can I find more technical details?'
            ],
            'crypto.html': [
                'How are Bitcoin and Ethereum correlated?',
                'What patterns does the analysis show?',
                'Can this predict market movements?'
            ]
        };
        
        return suggestions[this.currentPage] || suggestions['index.html'];
    }
    
    /**
     * Get page recommendations
     */
    getRecommendations() {
        return getPageRecommendations(this.currentPage);
    }
    
    /**
     * Get technical concept information
     */
    getConceptInfo(conceptKey) {
        return getTechnicalConceptInfo(conceptKey);
    }
    
    /**
     * Generate a simple response without Claude API (fallback)
     */
    generateFallbackResponse(question) {
        const pageInfo = this.pageContext.pageInfo;
        const userLower = question.toLowerCase();
        
        let response = `I'm an AI assistant for the CoherIQs website. `;
        
        if (userLower.includes('wavelet')) {
            const concept = getTechnicalConceptInfo('waveletCoherence');
            response += `Wavelet coherence is ${concept.definition}. The mathematical formula is: ${concept.formula}`;
        } else if (userLower.includes('performance')) {
            response += `CoherIQs uses the Fast Continuous Wavelet Transform (fCWT) algorithm, which provides orders of magnitude better performance than traditional implementations like PyCWT.`;
        } else if (userLower.includes('page') || userLower.includes('navigate')) {
            response += `You're currently on the ${pageInfo.title} page. ${pageInfo.purpose}`;
        } else {
            response += `You're on the ${pageInfo.title} page, which focuses on ${pageInfo.purpose.toLowerCase()}. `;
            response += `This page is designed for ${pageInfo.targetAudience.toLowerCase()}.`;
        }
        
        return {
            response: response,
            status: 'fallback',
            pageContext: pageInfo,
            suggestions: generatePageSuggestions(this.currentPage, question)
        };
    }
}

// Initialize the assistant when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait longer for config files to load, especially config_local.js
    setTimeout(() => {
        try {
            // Initialize with configuration-based defaults
            window.coheriqsAssistant = new CoherIQsAssistant();
            
            const config = window.coheriqsAssistant.config;
            console.log('CoherIQs Assistant initialized for page:', window.coheriqsAssistant.currentPage);
            console.log('Environment:', config.environment);
            console.log('Configuration details:', {
                useProxy: window.coheriqsAssistant.useProxy,
                hasApiKey: !!window.coheriqsAssistant.apiKey,
                proxyEndpoint: window.coheriqsAssistant.proxyEndpoint,
                useDirectAPI: config.api.claude.useDirectAPI,
                debugMode: config.app.features.debugMode
            });
            
            if (config.app.features.debugMode) {
                console.log('Full config:', config);
                if (window.coheriqsAssistant.apiKey) {
                    console.log('✓ API key loaded - will use direct Claude API calls');
                } else {
                    console.log('⚠ No API key - will use fallback responses');
                }
            }
        } catch (error) {
            console.error('Error initializing CoherIQs Assistant:', error);
            // Create a minimal fallback assistant
            window.coheriqsAssistant = {
                askQuestion: async function(question) {
                    return {
                        response: "I'm currently having trouble connecting. Please try again later.",
                        status: 'error',
                        suggestions: []
                    };
                },
                getSuggestedQuestions: function() {
                    return [
                        'What is wavelet coherence?',
                        'How does this compare to traditional methods?',
                        'What are the applications?'
                    ];
                }
            };
        }
    }, 200); // Increased delay to allow config_local.js to load
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CoherIQsAssistant,
        WEBSITE_PAGES,
        TECHNICAL_CONCEPTS,
        getCurrentPageContext,
        getPageSpecificKnowledge,
        getTechnicalConceptInfo,
        generatePageSuggestions,
        getPageRecommendations
    };
}
