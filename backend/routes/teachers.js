import express from 'express';
import {
  getTeachers,
  getTeacher,
  getTeacherSubjects,
  createTeacher,
  updateTeacher
} from '../controllers/teacherController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getTeachers);
router.get('/:id', getTeacher);
router.get('/:id/subjects', getTeacherSubjects);

// Admin only routes
router.post('/', restrictTo('admin'), createTeacher);
router.patch('/:id', restrictTo('admin'), updateTeacher);

export default router;