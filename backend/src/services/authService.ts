// src/services/authService.ts
import prisma from '../utils/prisma'
import bcrypt from 'bcryptjs'

export const createUser = async (userData: {
  name: string
  email: string
  password: string
  role?: any
  image?: string | null
  isVerified?: boolean
}) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  return prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
      role: userData.role || 'STUDENT',
      image: userData.image || null,
      isVerified: userData.isVerified || false
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerified: true,
      image: true,
      createdAt: true
    }
  })
}

export const createNewPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
}

export const validateCredentials = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) return null

  const isValid = await bcrypt.compare(password, user.password)
  return isValid ? user : null
}