const taskService = require('./task.service');
const projectService = require('../project/project.service');
const sendApiResponse = require('../../utils/apiResponse');
const { HTTP_STATUS } = require('../../utils/constants');

const taskController = {
  createTask: async (req, res) => {
    try {
      const project = await projectService.findById(req.body.projectId);
      if (!project) {
        return sendApiResponse(res, HTTP_STATUS.NOT_FOUND, 'Project not found');
      }

      const task = await taskService.create({
        ...req.body,
        project: req.body.projectId
      });

      await projectService.update(req.body.projectId, {
        $push: { tasks: task._id }
      });

      return sendApiResponse(res, HTTP_STATUS.CREATED, {
        message: 'Task created successfully',
        data: task
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
    }
  },

  getProjectTasks: async (req, res) => {
    try {
      const tasks = await taskService.findByProject(req.params.projectId);
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'Tasks fetched successfully',
        data: tasks
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
    }
  },

  getTaskById: async (req, res) => {
    try {
      const task = await taskService.findById(req.params.id);
      if (!task) {
        return sendApiResponse(res, HTTP_STATUS.NOT_FOUND, 'Task not found');
      }
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'Task fetched successfully',
        data: task
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
    }
  },

  updateTask: async (req, res) => {
    try {
      const task = await taskService.update(req.params.id, req.body);
      if (!task) {
        return sendApiResponse(res, HTTP_STATUS.NOT_FOUND, 'Task not found');
      }
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'Task updated successfully',
        data: task
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
    }
  },

  deleteTask: async (req, res) => {
    try {
      const task = await taskService.findById(req.params.id);
      if (!task) {
        return sendApiResponse(res, HTTP_STATUS.NOT_FOUND, 'Task not found');
      }

      await Promise.all([
        taskService.delete(req.params.id),
        projectService.update(task.project, {
          $pull: { tasks: task._id }
        })
      ]);

      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'Task deleted successfully'
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
    }
  },

  assignTask: async (req, res) => {
    try {
      const task = await taskService.assignUser(req.params.id, req.params.userId);
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'Task assigned successfully',
        data: task
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
    }
  },

  updateTaskStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const task = await taskService.updateStatus(req.params.id, status);
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'Task status updated successfully',
        data: task
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
    }
  }
};

module.exports = taskController;
