// const sendApiResponse = require('../../utils/apiResponse');

// const validate = (schema) => async (req, res, next) => {
//   try {
//     req.body = await schema.parseAsync(req.body);
//     next();
//   } catch (err) {
//     const errors = err.errors.reduce((acc, e) => ({
//       ...acc,
//       [e.path.join('.')]: e.message
//     }), {});
//     sendApiResponse(res, 400, errors);
//   }
// };

// module.exports = validate;

const validate = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync(req.body);
        req.body = validatedData;
        next();
    } catch (error) {
        const validationErrors = {};
        error.errors.forEach((err) => {
            validationErrors[err.path[0]] = err.message;
        });

        return res.status(400).json({
            success: false,
            message: validationErrors,
            data: {}
        });
    }
};

module.exports = validate;
