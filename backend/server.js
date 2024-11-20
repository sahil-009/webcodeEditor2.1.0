import express from 'express';
import axios from 'axios';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import process from 'node:process';

// Initialize dotenv before using env variables
dotenv.config();

const app = express();
const PORT = 3000;

// Get API key from environment variables
const RAPID_API_KEY = process.env.RAPID_API_KEY;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(helmet());
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

// Code execution endpoint
app.post('/execute', async (req, res) => {
  const { language, code, input } = req.body;

  if (!language || !code) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Both language and code are required'
    });
  }

  const languageMap = {
    javascript: 63,
    python: 71,
    cpp: 53,
    java: 62,
  };

  const languageId = languageMap[language.toLowerCase()];
  if (!languageId) {
    return res.status(400).json({
      error: 'Invalid language',
      message: `Supported languages are: ${Object.keys(languageMap).join(', ')}`
    });
  }

  try {
    // Submit code
    const submitResponse = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
      source_code: code,
      language_id: languageId,
      stdin: input || ''
    }, {
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    });

    const token = submitResponse.data.token;

    // Wait for results
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get submission results
    const resultResponse = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    });

    console.log('Execution results:', resultResponse.data);
    res.json(resultResponse.data);
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Execution failed',
      message: 'An error occurred during code execution.'
    });
  }
});

// Error handling middleware
app.use((err, req, res) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Please try again later.'
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server shut down');
  });
});