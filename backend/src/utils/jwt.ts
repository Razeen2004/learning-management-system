// src/utils/jwt.ts
import jwt from 'jsonwebtoken'

export const generateToken = (userId: string, role: any) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
}