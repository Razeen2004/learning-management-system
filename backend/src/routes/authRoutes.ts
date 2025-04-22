// src/routes/authRoutes.ts
import { Router } from 'express'
import { signup, login, protectedRoute, SendVerifyEmailCode, VerifyEmail } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-verify-code', SendVerifyEmailCode);
router.post('/verify', VerifyEmail); // Assuming this is for email verification
router.get('/protected', authMiddleware, protectedRoute);

export default router