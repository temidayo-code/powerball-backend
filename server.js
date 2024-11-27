const express = require('express');
const cors = require('cors');
const { sendEmail } = require('./controllers/emailController');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
