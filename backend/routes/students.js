import express from 'express';
import {
  getStudents,
  getStudent,
  getStudentProfile,
  getStudentGrades,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { validateStudent } from '../middleware/validation.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/', restrictTo('teacher', 'admin'), getStudents);
router.get('/:id', getStudentProfile);
router.get('/:id/grades', getStudentGrades);

// Admin and teacher only routes
router.post('/', restrictTo('admin', 'teacher'), validateStudent, createStudent);
router.patch('/:id', restrictTo('admin', 'teacher'), updateStudent);
router.delete('/:id', restrictTo('admin'), deleteStudent);

export default router;