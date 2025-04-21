// src/routes/authRoutes.ts
import { Router } from 'express'
import { signup, login, protectedRoute } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/protected', authMiddleware, protectedRoute)

export default router