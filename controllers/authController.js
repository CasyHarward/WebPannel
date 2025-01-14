const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../config/db');

// Handle user login
exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
};

// Handle profile route (protected)
exports.profile = (req, res) => {
    const user = users.find(user => user.id === req.userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username, message: 'Profile fetched successfully' });
};
