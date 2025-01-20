const router = require('express').Router();
const projectController = require('./project.controller');
const validate = require('../../core/middleware/validate');
const projectSchema = require('../../core/schemas/project.schema');

router.post('/', validate(projectSchema), projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', validate(projectSchema), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.post('/:id/users/:userId', projectController.addUserToProject);
router.delete('/:id/users/:userId', projectController.removeUserFromProject);

module.exports = router;
