const express = require('express');
const dotenv = require('dotenv');
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.post('/login', authController.login);
app.get('/profile', authMiddleware.verifyToken, authController.profile);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
