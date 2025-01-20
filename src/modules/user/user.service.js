const User = require('./user.model');
const { USER_MESSAGES } = require('../../utils/constants');
const bcrypt = require('bcryptjs');


const userService = {
  create: async (userData) => {
    const exists = await User.findOne({ email: userData.email });
    if (exists) throw new Error(USER_MESSAGES.EMAIL_EXUSER_EXISTSISTS);
    return User.create(userData);
  },

  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return user;
  },

  findAll: async () => {
    return User.find({})
      .select('-password')
      .sort({ createdAt: -1 });
  },

  findById: async (id) => {
    return User.findById(id).select('-password');
  },

  update: async (id, updateData) => {
    const currentUser = await User.findById(id);

    if (updateData.email && updateData.email !== currentUser.email) {
      throw new Error('Email updates are restricted for security purposes');
    }

    const { email, ...allowedUpdates } = updateData;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      allowedUpdates,
      { new: true, runValidators: true }
    ).select('-password');

    return updatedUser;
  },

  delete: async (id) => {
    return User.findByIdAndDelete(id);
  },

  findByEmail: async (email) => {
    return User.findOne({ email });
  }
};

module.exports = userService;
