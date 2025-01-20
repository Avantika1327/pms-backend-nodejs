const Task = require('./task.model');

const taskService = {
    create: async (taskData) => {
        const existingTask = await Task.findOne({
            title: taskData.title,
        });

        if (existingTask) {
            throw new Error('Task with this name already exists in the project');
        }

        return Task.create(taskData);
    },

    findById: async (id) => {
        return Task.findById(id).populate('assignedTo project');
    },

    update: async (id, updates) => {
        return Task.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        }).populate('assignedTo project');
    },

    delete: async (id) => {
        return Task.findByIdAndDelete(id);
    },

    findByProject: async (projectId) => {
        return Task.find({ project: projectId })
            .populate('assignedTo')
            .sort({ createdAt: -1 });
    },

    assignUser: async (taskId, userId) => {
        return Task.findByIdAndUpdate(
            taskId,
            { assignedTo: userId },
            { new: true }
        ).populate('assignedTo project');
    },

    updateStatus: async (taskId, status) => {
        return Task.findByIdAndUpdate(
            taskId,
            { status },
            { new: true }
        ).populate('assignedTo project');
    }
};

module.exports = taskService;
