const express = require('express');
const cors = require('cors');
const { sendEmail } = require('../controllers/emailController');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['https://powerball-ten.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Accept']
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Powerball Backend Server is Running on Vercel!');
});

// Form submission route
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

// Export for Vercel serverless
module.exports = app;
