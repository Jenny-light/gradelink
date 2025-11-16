import express from 'express';
import {
  getClasses,
  getClass,
  createClass,
  updateClass,
  getClassStudents,
  getClassSubjects
} from '../controllers/classController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getClasses);
router.get('/:id', getClass);
router.get('/:id/students', getClassStudents);
router.get('/:id/subjects', getClassSubjects);

// Admin and teacher only routes
router.post('/', restrictTo('admin', 'teacher'), createClass);
router.patch('/:id', restrictTo('admin', 'teacher'), updateClass);

export default router;