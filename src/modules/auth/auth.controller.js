const jwt = require('jsonwebtoken');
const userService = require('../user/user.service');
const sendApiResponse = require('../../utils/apiResponse');
const { HTTP_STATUS, AUTH_MESSAGES, TOKEN_CONFIG } = require('../../utils/constants');

module.exports = {
    signUp: async (req, res) => {
        try {
            const user = await userService.create(req.body);
            sendApiResponse(res, HTTP_STATUS.CREATED, {
                message: AUTH_MESSAGES.SIGNUP_SUCCESS,
                data: user
            });
        } catch (error) {
            sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
        }
    },

    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.authenticate(email, password);

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: TOKEN_CONFIG.EXPIRES_IN }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: TOKEN_CONFIG.COOKIE_MAX_AGE
            });

            sendApiResponse(res, HTTP_STATUS.OK, {
                message: AUTH_MESSAGES.SIGNIN_SUCCESS,
                data: { user, token }
            });
        } catch (error) {
            sendApiResponse(res, HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_CREDENTIALS);
        }
    },

    signOut: (req, res) => {
        res.clearCookie('token');
        sendApiResponse(res, HTTP_STATUS.OK, { message: AUTH_MESSAGES.SIGNOUT_SUCCESS });
    }
};
