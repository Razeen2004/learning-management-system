// src/controllers/authController.ts
import { Request, Response } from 'express'
import { createUser, validateCredentials } from '../services/authService'
import { generateToken } from '../utils/jwt'
import { SignupSchema, LoginSchema } from '../validators/authValidators'
import prisma from '../utils/prisma';

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = SignupSchema.parse(req.body)

        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser) return res.status(400).json({ message: 'User already exists' })

        const user = await createUser({ name, email, password, role })
        const token = generateToken(user.id, user.role)

        res.status(201).json({ user, token })
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.json({
            id: user.id,
            email: user.email,
            role: user.role,
        });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

export const protectedRoute = (req: any, res: Response) => {
    res.json({ message: 'Protected route accessed', user: req?.user })
}