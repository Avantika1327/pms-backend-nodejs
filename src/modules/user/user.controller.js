const userService = require('./user.service');
const sendApiResponse = require('../../utils/apiResponse');
const { HTTP_STATUS } = require('../../utils/constants');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.findAll();
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'Users fetched successfully',
        data: users
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, {
        message: error.message
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) {
        return sendApiResponse(res, HTTP_STATUS.NOT_FOUND, {
          message: 'User not found'
        });
      }
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'User fetched successfully',
        data: user
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, {
        message: error.message
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await userService.update(req.params.id, req.body);
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'User updated successfully',
        data: user
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, {
        message: error.message
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await userService.delete(req.params.id);
      return sendApiResponse(res, HTTP_STATUS.OK, {
        message: 'User deleted successfully'
      });
    } catch (error) {
      return sendApiResponse(res, HTTP_STATUS.BAD_REQUEST, {
        message: error.message
      });
    }
  }
};

module.exports = userController;
