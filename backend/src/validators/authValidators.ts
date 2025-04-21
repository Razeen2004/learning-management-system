// src/validators/authValidator.ts
import { z } from 'zod'

export const SignupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'TEACHER', 'STUDENT']).optional()
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})