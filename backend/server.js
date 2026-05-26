const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
];





// ✅ CORS setup
app.use(cors({
    origin: function(origin, callback) {

        // Postman/mobile apps/no origin requests allow
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// API key check
if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY missing');
    process.exit(1);
}

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Gemini model
const model = genAI.getGenerativeModel({
    model: 'gemini-3.5-flash'
});

// Routes
app.get('/', (req, res) => {
    res.send('AI Backend Running 🚀');
});

// Chat API
app.post('/api/chat', async (req, res) => {
    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: 'Message required'
            });
        }

        const result = await model.generateContent(message);

        const response = result.response.text();

        res.json({
            reply: response
        });

    } catch (error) {

        console.error('Gemini Error:', error);

        res.status(500).json({
            error: error.message
        });
    }
});

// Server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});