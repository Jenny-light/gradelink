import express from 'express';
import {
  getGrades,
  getGrade,
  createGrade,
  updateGrade,
  deleteGrade,
  bulkUploadGrades
} from '../controllers/gradeController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { validateGrade } from '../middleware/validation.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/', getGrades);
router.get('/:id', getGrade);
router.post('/', restrictTo('teacher', 'admin'), validateGrade, createGrade);
router.post('/bulk', restrictTo('teacher', 'admin'), bulkUploadGrades);
router.patch('/:id', restrictTo('teacher', 'admin'), updateGrade);
router.delete('/:id', restrictTo('teacher', 'admin'), deleteGrade);

export default router;