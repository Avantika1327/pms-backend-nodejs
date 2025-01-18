const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  let token;

  // Check if the token is in cookies
  if (req.cookies && req.cookies.auth_token) {
    try {
      token = req.cookies.auth_token; // Get token from cookies

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object
      req.user = await User.findById(decoded.id).select('-password');

      // Move to the next middleware/route handler
      next();
    } catch (error) {
        console.log(error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'No token, authorization denied' });
  }
};
