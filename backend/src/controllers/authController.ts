// src/controllers/authController.ts
import { Request, Response } from 'express'
import { createNewPassword, createUser, validateCredentials } from '../services/authService'
import { generateToken } from '../utils/jwt'
import { SignupSchema, LoginSchema } from '../validators/authValidators'
import prisma from '../utils/prisma';
import SendMail, { SendRecoveryMail } from '../utils/mail';

// Signup the user, with the given name, email and password....
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

// Login the user, with the given email and password....
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = LoginSchema.parse(req.body)

        const user = await validateCredentials(email, password);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' })
        // const token = generateToken(user.id, user.role);
        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            role: user.role,
        });

    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
};

// Send the Verification token to the email, after getting their email....
export const SendVerifyEmailCode = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(404).json({ message: 'User not found' })

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const updatedUser = await prisma.user.update({
            where: { email },
            data: { verificationToken: verificationCode }
        })

        SendMail(email, "Email Verification - Life Long Learning", `${verificationCode}`, email);
        res.status(200).json({ message: 'Verification email sent' })

    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

// Verify the email, with the given password token from email....
export const VerifyEmail = async (req: Request, res: Response) => {
    try {
        const { email, verificationCode } = req.body
        const user = await prisma.user.findFirst({
            where: {
                email,
                verificationToken: verificationCode
            }
        })
        if (!user) return res.status(404).json({ message: 'User or Token is not Correct!' });
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { isVerified: true, verificationToken: null }
        })
        res.status(200).json({ message: 'Email verified successfully' })

    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

// Send the recovery phase to the email, after getting their email....
export const SendRecoveryPhrase = async (req: Request, res: Response) => {
    try {

        const { email } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { verificationToken: verificationCode }
        });

        SendRecoveryMail(email, "Password Recovery - Life Long Learning", verificationCode, email);
        res.status(200).json({ message: 'Recovery email sent' })

    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

// Recover the password, by the email verification and new password....
export const RecoverPassword = async (req: Request, res: Response) => {
    try {
        const { email, password, verificationCode } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.verificationToken !== verificationCode) return res.status(404).json({ message: 'Verification code is not correct!' });

        const hashedPassword = await createNewPassword(password);

        const updatedUser = await prisma.user.update({
            where: { email },
            data: { password: hashedPassword, verificationToken: null }
        })
        res.status(200).json({ message: 'Password updated successfully' })

    }
    catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}


export const protectedRoute = (req: any, res: Response) => {
    res.json({ message: 'Protected route accessed', user: req?.user })
}