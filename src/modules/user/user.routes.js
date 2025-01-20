const router = require('express').Router();
const userController = require('./user.controller');
const validate = require('../../core/middleware/validate');
const userSchema = require('../../core/schemas/user.schema');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(userSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
