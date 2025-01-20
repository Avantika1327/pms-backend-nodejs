const sendApiResponse = require('../../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  sendApiResponse(res, statusCode, err.message);
};

module.exports = errorHandler;
