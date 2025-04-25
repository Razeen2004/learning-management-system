// src/routes/authRoutes.ts
import { Router } from 'express'
import { signup, login, protectedRoute, SendVerifyEmailCode, VerifyEmail, RecoverPassword, SendRecoveryPhrase, loginWithGoogle } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/send-verify-code', SendVerifyEmailCode);
router.post('/verify', VerifyEmail);
router.post('/forgot-password', SendRecoveryPhrase);
router.post('/reset-password', RecoverPassword);
router.post('/google-login', loginWithGoogle)
router.get('/protected', authMiddleware, protectedRoute);

export default router