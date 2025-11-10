const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const Result = require('../models/Result');

function grade(total) {
  if (total >= 70) return 'A';
  if (total >= 60) return 'B';
  if (total >= 50) return 'C';
  if (total >= 45) return 'D';
  return 'F';
}

// Teacher enter result
router.post('/', protect(['teacher', 'admin']), async (req, res) => {
  const { student, subject, session, term, ca, exam } = req.body;
  const total = Number(ca) + Number(exam);
  const result = await Result.create({ student, subject, session, term, ca, exam, total, grade: grade(total) });
  res.json(result);
});

// Student/Parent view results
router.get('/student/:id', protect(['student', 'parent', 'teacher', 'admin']), async (req, res) => {
  const results = await Result.find({ student: req.params.id }).populate('subject');
  res.json(results);
});

module.exports = router;
