const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createProject, getProjects } = require('../controllers/projectController');
const router = express.Router();

router.post('/', protect, createProject);
router.get('/', protect, getProjects);

module.exports = router;
