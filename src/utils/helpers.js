const helpers = {
  isValidObjectId: (id) => {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
  },

  paginateResults: (page = 1, limit = 10) => ({
    skip: (page - 1) * limit,
    limit: parseInt(limit)
  }),

  sanitizeData: (obj) => {
    const sanitized = {};
    Object.keys(obj).forEach(key => {
      if (obj[key] !== undefined && obj[key] !== null) {
        sanitized[key] = obj[key];
      }
    });
    return sanitized;
  }
};

module.exports = helpers;
