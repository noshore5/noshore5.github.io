/**
 * Vercel Serverless Function for Claude API
 * This function acts as a proxy between your frontend and Claude's API
 */

module.exports = async function handler(req, res) {
  // Enable CORS for all origins (you can restrict this later)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`Method not allowed: ${req.method}`);
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['POST'],
      receivedMethod: req.method
    });
  }

  try {
    console.log('Received request:', {
      method: req.method,
      headers: req.headers,
      body: req.body ? 'present' : 'missing'
    });

    const { question, contextData = {} } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Get API key from environment variable
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      console.error('CLAUDE_API_KEY environment variable not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log('Making request to Claude API...');

    // Build the prompt with context
    const systemPrompt = `You are an AI assistant for the CoherIQs website. 

CoherIQs is a project focused on wavelet coherence analysis with these key aspects:
- Originally developed for examining El Niño-Southern Oscillation and tropical storms in India
- Wavelet coherence analyzes lead-lag relationships in time series data using wavelet transforms
- The Coherent Multiplex is a real-time dashboard for selective computation and visualization
- Uses Fast Continuous Wavelet Transform (fCWT) for high-performance analysis
- Applications include finance, economics, neuroscience, and signal processing

Provide helpful, accurate responses about wavelet coherence, the CoherIQs project, and related topics. Be conversational but informative.`;

    // Make request to Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: question
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: `Claude API error: ${response.status}`,
        details: errorData
      });
    }

    const data = await response.json();

    // Return the response
    return res.status(200).json({
      response: data.content[0].text,
      status: 'success',
      suggestions: [
        { title: "Coherent Multiplex", page: "coherentmultiplex.html", reason: "Learn about our real-time dashboard" },
        { title: "Literature", page: "literature.html", reason: "Explore academic background" },
        { title: "Performance", page: "performance.html", reason: "See technical specifications" }
      ]
    });

  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
