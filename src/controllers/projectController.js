const Project = require('../models/projectModel');

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({ name, description, users: [req.user._id] });
  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ users: req.user._id });
  res.json(projects);
};
