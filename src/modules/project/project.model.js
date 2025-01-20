const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  type: {
    type: String,
    required: true,
    enum: ['DEVELOPMENT', 'DESIGN', 'MARKETING', 'RESEARCH']
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'ON_HOLD', 'COMPLETED'],
    default: 'ACTIVE'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  budget: {
    type: Number,
    min: 0
  },
  tags: [String],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true 
});

projectSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('Project', projectSchema);
