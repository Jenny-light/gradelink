const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const Subject = require('../models/Subject');

// Add subject
router.post('/', protect(['admin']), async (req, res) => {
  const subject = await Subject.create(req.body);
  res.json(subject);
});

// List subjects
router.get('/', protect(['admin', 'teacher', 'student']), async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

module.exports = router;
