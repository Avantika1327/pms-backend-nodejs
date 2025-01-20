const mongoose = require('mongoose');
const config = require('./environment');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('✨ Database connected successfully to:', config.MONGODB_URI);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
