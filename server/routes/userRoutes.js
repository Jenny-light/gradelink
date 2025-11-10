const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const Student = require('../models/Student');

// Admin create student
router.post('/student', protect(['admin']), async (req, res) => {
  const { name, studentId, className, gender } = req.body;
  const student = await Student.create({ name, studentId, className, gender });
  res.json(student);
});

// List all students
router.get('/students', protect(['admin', 'teacher']), async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

module.exports = router;
