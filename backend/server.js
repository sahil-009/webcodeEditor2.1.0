import express from 'express';
import axios from 'axios';
import cors from 'cors';
import helmet from 'helmet'; // Security headers

const app = express();
const PORT = 3000;

// Configure CORS to allow requests only from your specific frontend URL
app.use(cors({
  origin: 'http://194.195.117.239:5173', // Replace with your frontend's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Security headers
app.use(helmet());

app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

// Code execution endpoint
app.post('/execute', async (req, res) => {
  console.log('Received request:', req.body); // Debug log

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
    console.log('Sending request to Judge0...'); // Debug log
    const response = await axios.post('http://172.105.52.188:2358/submissions/?base64_encoded=false&wait=true', {
      source_code: code,
      language_id: languageId,
      stdin: input || '',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Received response from Judge0:', response.data); // Debug log
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);

    // Return generic error message in production
    res.status(500).json({
      error: 'Execution failed',
      message: 'An error occurred during code execution.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Please try again later.'
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://194.195.117.239:${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server shut down');
  });
});