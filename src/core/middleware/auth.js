const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/environment');
const sendApiResponse = require('../../utils/apiResponse');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return sendApiResponse(res, 401, 'Authentication required');

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    sendApiResponse(res, 401, 'Invalid token');
  }
};

module.exports = auth;
