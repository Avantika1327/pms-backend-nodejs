const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Find user by username
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token in the cookie
    res.cookie('auth_token', token, {
        httpOnly: true, // Prevent access from JavaScript
        secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production (requires HTTPS)
        maxAge: 3600000, // Token expiration in milliseconds (1 hour)
    });

    // Send response with user data (except password)
    res.status(200).json({
        message: 'Login successful',
        user: { id: user._id, username: user.username },
    });
};

