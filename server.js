const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import the CORS middleware
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;  // Ensure it's running on the expected port

// CORS Configuration - Allow requests from all origins (or just localhost for local testing)
app.use(cors({
  origin: '*',  // Allow all origins, suitable for your Render deployment
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Serve static files from the 'public' directory (index.html, CSS, JS)
app.use(express.static('public'));  // This serves index.html and other static files like CSS, JS

// Get SerpAPI key from .env file
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;  // SerpAPI API Key

app.use(express.json());

// Function to get real-time answers from the web
const fetchAnswerFromWeb = async (query) => {
  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        api_key: SERPAPI_API_KEY,
        q: query,  // Search query
        engine: 'google',
        hl: 'en',
        gl: 'us',
      },
    });

    const firstResult = response.data.organic_results && response.data.organic_results[0];

    if (firstResult) {
      return firstResult.snippet || 'No relevant answer found.';
    } else {
      return 'No search results found.';
    }
  } catch (error) {
    console.error('Error fetching data from the web:', error.message);
    return 'An error occurred while fetching the answer.';
  }
};

// POST route to handle user input and get web response
app.post('/process', async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid input: "text" is required and must be a non-empty string.',
    });
  }

  try {
    const answer = await fetchAnswerFromWeb(text);
    res.json({ response: answer });

  } catch (error) {
    console.error('Error during API request:', error.message);
    res.status(500).json({
      error: 'An unexpected error occurred. Please try again later.',
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
