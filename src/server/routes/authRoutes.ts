import express from 'express';
import { register, login, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController';
import { body } from 'express-validator';

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('organizationName').notEmpty().withMessage('שם הארגון הוא שדה חובה'),
  body('email').isEmail().withMessage('אימייל לא תקין'),
  body('password').isLength({ min: 8 }).withMessage('סיסמה חייבת להכיל לפחות 8 תווים'),
  body('firstName').notEmpty().withMessage('שם פרטי הוא שדה חובה'),
  body('lastName').notEmpty().withMessage('שם משפחה הוא שדה חובה')
];

const loginValidation = [
  body('email').isEmail().withMessage('אימייל לא תקין'),
  body('password').notEmpty().withMessage('סיסמה היא שדה חובה')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', body('email').isEmail(), forgotPassword);
router.post('/reset-password/:token', body('password').isLength({ min: 8 }), resetPassword);

export default router;
