const router = require('express').Router();
const authController = require('./auth.controller');
const validate = require('../../core/middleware/validate');
const userSchema = require('../../core/schemas/user.schema');

router.post('/sign-up', validate(userSchema), authController.signUp);
router.post('/sign-in', authController.signIn);
router.post('/sign-out', authController.signOut);

module.exports = router;

 