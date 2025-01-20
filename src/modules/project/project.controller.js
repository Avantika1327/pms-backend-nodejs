const projectService = require('./project.service');
const sendApiResponse = require('../../utils/apiResponse');
const { HTTP_STATUS, PROJECT_MESSAGES } = require('../../utils/constants');

const projectController = {
    createProject: async (req, res) => {
        try {
            const projectData = {
                ...req.body,
                createdBy: req.user.userId,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate)
            };
            console.log(projectData, 'projectData');

            const project = await projectService.create(projectData);
            return sendApiResponse(res, HTTP_STATUS.CREATED, {
                message: PROJECT_MESSAGES.CREATED,
                data: project
            });
        } catch (error) {
            return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
        }
    },

    getAllProjects: async (req, res) => {
        try {
            const { type, status, priority, search } = req.query;
            const filters = {};

            if (type) filters.type = type;
            if (status) filters.status = status;
            if (priority) filters.priority = priority;
            if (search) filters.name = { $regex: search, $options: 'i' };

            const projects = await projectService.findAll(filters);
            return sendApiResponse(res, HTTP_STATUS.OK, {
                message: PROJECT_MESSAGES.FETCHED,
                data: projects
            });
        } catch (error) {
            return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
        }
    },

    getProjectById: async (req, res) => {
        try {
            const project = await projectService.findById(req.params.id);
            if (!project) {
                return sendApiResponse(res, HTTP_STATUS.NOT_FOUND, PROJECT_MESSAGES.NOT_FOUND);
            }
            return sendApiResponse(res, HTTP_STATUS.OK, {
                message: PROJECT_MESSAGES.FETCHED,
                data: project
            });
        } catch (error) {
            return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
        }
    },

    updateProject: async (req, res) => {
        try {
            if (req.body.startDate) req.body.startDate = new Date(req.body.startDate);
            if (req.body.endDate) req.body.endDate = new Date(req.body.endDate);

            const project = await projectService.update(req.params.id, req.body);
            return sendApiResponse(res, HTTP_STATUS.OK, {
                message: PROJECT_MESSAGES.UPDATED,
                data: project
            });
        } catch (error) {
            return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
        }
    },

    deleteProject: async (req, res) => {
        try {
            await projectService.delete(req.params.id);
            return sendApiResponse(res, HTTP_STATUS.OK, {
                message: PROJECT_MESSAGES.DELETED
            });
        } catch (error) {
            return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
        }
    },

    addUserToProject: async (req, res) => {
        try {
            const project = await projectService.addUser(req.params.id, req.params.userId);
            return sendApiResponse(res, HTTP_STATUS.OK, {
                message: PROJECT_MESSAGES.USER_ADDED,
                data: project
            });
        } catch (error) {
            return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
        }
    },

    removeUserFromProject: async (req, res) => {
        try {
            const project = await projectService.removeUser(req.params.id, req.params.userId);
            return sendApiResponse(res, HTTP_STATUS.OK, {
                message: PROJECT_MESSAGES.USER_REMOVED,
                data: project
            });
        } catch (error) {
            return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
        }
    }
};

module.exports = projectController;
