const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Serve static files from current directory
app.use(express.static('.'));

// News API proxy endpoint
app.get('/api/news', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const NEWS_API_KEY = '56dab31f519b40cab8a52cacb0614d5c';
  const API_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=publishedAt&pageSize=3&language=en&apiKey=${NEWS_API_KEY}`;
  
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('NewsAPI Error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `NewsAPI Error: ${response.status}`,
        details: errorText 
      });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});