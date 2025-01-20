const router = require('express').Router();
const taskController = require('./task.controller');
const validate = require('../../core/middleware/validate');
const taskSchema = require('../../core/schemas/task.schema');

router.post('/', validate(taskSchema), taskController.createTask);
router.get('/project/:projectId', taskController.getProjectTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validate(taskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/assign/:userId', taskController.assignTask);
router.patch('/:id/status', taskController.updateTaskStatus);

module.exports = router;
