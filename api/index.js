const express = require('express');
const cors = require('cors');
const { sendEmail } = require('../controllers/emailController');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['https://powerball-ten.vercel.app', 'http://localhost:5504'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
    try {
        console.log('Received form submission:', req.body);
        const result = await sendEmail(req.body);
        console.log('Email result:', result);
        
        if (result.success) {
            res.status(200).json({ 
                message: 'Form submitted successfully',
                messageId: result.messageId 
            });
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            message: 'Form submission failed',
            error: error.message 
        });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
