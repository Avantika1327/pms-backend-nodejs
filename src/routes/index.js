const router = require('express').Router();
const auth = require('../core/middleware/auth');

router.use('/', require('../modules/auth/auth.routes'));
router.use('/users', auth, require('../modules/user/user.routes'));
router.use('/projects', auth, require('../modules/project/project.routes'));
router.use('/tasks', auth, require('../modules/task/task.routes'));

module.exports = router;
