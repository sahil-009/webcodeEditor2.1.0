import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: '*', // You might want to restrict this to your frontend URL in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

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
        res.status(500).json({
            error: 'Execution failed',
            message: error.message,
            details: error.response?.data
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://172.105.52.188:${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

// Handle server shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server shut down');
    });
});