const Project = require('./project.model');
const User = require('../user/user.model');
const { PROJECT_MESSAGES } = require('../../utils/constants');

const projectService = {
    create: async (projectData) => {
        try {
            // Project name validation
            const existingProject = await Project.findOne({ name: projectData.name });
            if (existingProject) {
                throw new Error(PROJECT_MESSAGES.NAME_EXISTS);
            }

            // Date validation
            const startDate = new Date(projectData.startDate);
            const endDate = new Date(projectData.endDate);
            if (startDate >= endDate) {
                throw new Error(PROJECT_MESSAGES.INVALID_DATES);
            }

            // Tags validation
            if (projectData.tags) {
                projectData.tags = projectData.tags.filter(tag => tag.trim()).map(tag => tag.toLowerCase());
            }

            // Users validation
            console.log(projectData.users, 'projectData.users');
            
            if (projectData.users && projectData.users.length > 0) {
                const validUsers = await User.find({ _id: { $in: projectData.users } });
                if (validUsers.length !== projectData.users.length) {
                    throw new Error(PROJECT_MESSAGES.INVALID_USERS);
                }
            }

            return await Project.create(projectData);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    update: async (id, updates) => {
        try {
            // Name uniqueness check
            if (updates.name) {
                const existingProject = await Project.findOne({
                    name: updates.name,
                    _id: { $ne: id }
                });
                if (existingProject) {
                    throw new Error(PROJECT_MESSAGES.NAME_EXISTS);
                }
            }

            // Date validation
            if (updates.startDate && updates.endDate) {
                const startDate = new Date(updates.startDate);
                const endDate = new Date(updates.endDate);
                if (startDate >= endDate) {
                    throw new Error(PROJECT_MESSAGES.INVALID_DATES);
                }
            }

            // Tags validation
            if (updates.tags) {
                updates.tags = updates.tags.filter(tag => tag.trim()).map(tag => tag.toLowerCase());
            }

            // Users validation
            if (updates.users) {
                const validUsers = await User.find({ _id: { $in: updates.users } });
                if (validUsers.length !== updates.users.length) {
                    throw new Error(PROJECT_MESSAGES.INVALID_USERS);
                }
            }

            const updatedProject = await Project.findByIdAndUpdate(
                id, 
                updates, 
                { new: true, runValidators: true }
            ).populate('users tasks');

            if (!updatedProject) {
                throw new Error(PROJECT_MESSAGES.NOT_FOUND);
            }

            return updatedProject;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    findById: async (id) => {
        try {
            const project = await Project.findById(id).populate('users tasks');
            if (!project) {
                throw new Error(PROJECT_MESSAGES.NOT_FOUND);
            }
            return project;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    findAll: async (filters = {}) => {
        try {
            return await Project.find(filters)
                .populate('users tasks')
                .sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    delete: async (id) => {
        try {
            const project = await Project.findByIdAndDelete(id);
            if (!project) {
                throw new Error(PROJECT_MESSAGES.NOT_FOUND);
            }
            return project;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    addUser: async (projectId, userId) => {
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                throw new Error(PROJECT_MESSAGES.NOT_FOUND);
            }

            const userExists = await User.findById(userId);
            if (!userExists) {
                throw new Error(PROJECT_MESSAGES.USER_NOT_FOUND);
            }

            if (project.users.includes(userId)) {
                throw new Error(PROJECT_MESSAGES.USER_EXISTS);
            }

            return await Project.findByIdAndUpdate(
                projectId,
                { $addToSet: { users: userId } },
                { new: true }
            ).populate('users tasks');
        } catch (error) {
            throw new Error(error.message);
        }
    },

    removeUser: async (projectId, userId) => {
        try {
            const project = await Project.findById(projectId);
            if (!project) {
                throw new Error(PROJECT_MESSAGES.NOT_FOUND);
            }

            if (!project.users.includes(userId)) {
                throw new Error(PROJECT_MESSAGES.USER_NOT_IN_PROJECT);
            }

            return await Project.findByIdAndUpdate(
                projectId,
                { $pull: { users: userId } },
                { new: true }
            ).populate('users tasks');
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = projectService;
