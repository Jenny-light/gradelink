import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Auth validation rules
export const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['student', 'teacher', 'admin'])
    .withMessage('Role must be student, teacher, or admin'),
  handleValidationErrors
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Grade validation rules
export const validateGrade = [
  body('student')
    .isMongoId()
    .withMessage('Valid student ID is required'),
  body('subject')
    .isMongoId()
    .withMessage('Valid subject ID is required'),
  body('marks')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Marks must be between 0 and 100'),
  body('term')
    .isIn(['First Term', 'Second Term', 'Third Term', 'Final'])
    .withMessage('Valid term is required'),
  body('academicYear')
    .notEmpty()
    .withMessage('Academic year is required'),
  handleValidationErrors
];
 
// Student validation rules
export const validateStudent = [
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required'),
  body('rollNumber')
    .notEmpty()
    .withMessage('Roll number is required'),
  body('class')
    .isMongoId()
    .withMessage('Valid class ID is required'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Valid date of birth is required'),
  body('parentName')
    .notEmpty()
    .withMessage('Parent name is required'),
  body('parentContact')
    .notEmpty()
    .withMessage('Parent contact is required'),
  handleValidationErrors
];