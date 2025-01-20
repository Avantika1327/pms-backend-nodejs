const sendApiResponse = (res, code, payload) => {
  const isError = code >= 400;
  return res.status(code).json({
    error: isError,
    status: !isError,
    message: isError ? payload : payload?.message,
    data: isError ? {} : payload?.data || {}
  });
};

module.exports = sendApiResponse;
