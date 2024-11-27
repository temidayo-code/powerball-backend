const express = require('express');
const cors = require('cors');
const { sendEmail } = require('../controllers/emailController');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['https://your-frontend-vercel-url.vercel.app', 'http://localhost:5504'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
    try {
        const result = await sendEmail(req.body);
        if (result.success) {
            res.status(200).json({ 
                message: 'Form submitted successfully',
                messageId: result.messageId 
            });
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Form submission failed',
            error: error.message 
        });
    }
});

module.exports = app;
