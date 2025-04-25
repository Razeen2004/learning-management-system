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

        const user = await createUser({ name, email, password, role, image: null })
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

export const loginWithGoogle = async (req: Request, res: Response) => {
    try {
        const { email, name, image } = req.body;

        // Check if user exists
        let user = await prisma.user.findUnique({ where: { email } });

        if(user?.image == null){
            // Update the user with the image URL if it is null
            const updatedImageUser = await prisma.user.update({
                where: { email },
                data: { image }
            });
        }

        if (!user) {
            // If user doesn't exist, create the user
            const newUser = await createUser({ name, email, password: "", role: "STUDENT", image });
            return res.status(201).json({
                message: "User created successfully",
                user: newUser, // Send the created user object back
            });
        }

        // If user exists, return user object
        return res.status(200).json({
            message: "User already exists",
            user, // Send the existing user object back
        });

    } catch (error: any) {
        console.error("Error in Google login handler:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// Send the Verification token to the email, after getting their email....
export const SendVerifyEmailCode = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(404).json({ message: 'User not found' })

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                verificationToken: verificationCode,
                tokenExpiry: tokenExpiry
            }
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
        const { email, verificationCode } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !user.verificationToken || !user.tokenExpiry) {
            return res.status(404).json({ message: 'User or Token is not correct!' });
        }

        const now = new Date();

        // Check if token expired
        if (now > user.tokenExpiry) {
            await prisma.user.update({
                where: { email },
                data: {
                    verificationToken: null,
                    tokenExpiry: null
                }
            });
            return res.status(400).json({ message: 'Token expired' });
        }

        // Check if token is correct
        if (user.verificationToken !== verificationCode) {
            return res.status(400).json({ message: 'Verification code is not correct!' });
        }

        // Token valid, update user
        await prisma.user.update({
            where: { email },
            data: {
                isVerified: true,
                verificationToken: null,
                tokenExpiry: null
            }
        });

        return res.status(200).json({ message: 'Email verified successfully' });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

// Send the recovery phase to the email, for forgotting password....
export const SendRecoveryPhrase = async (req: Request, res: Response) => {
    try {

        const { email } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
        const updatedUser = await prisma.user.update({
            where: { email },
            data: { verificationToken: verificationCode, tokenExpiry }
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
            where: { email }
        });

        if (!user || !user.verificationToken || !user.tokenExpiry) {
            return res.status(404).json({ message: 'User or Token is not correct!' });
        }

        const now = new Date();
        if (now > user.tokenExpiry) {
            await prisma.user.update({
                where: { email },
                data: {
                    verificationToken: null,
                    tokenExpiry: null
                }
            });
            return res.status(400).json({ message: 'Token expired' });
        }

        // Check if token is correct
        if (user.verificationToken !== verificationCode) {
            return res.status(400).json({ message: 'Verification code is not correct!' });
        }

        const hashedPassword = await createNewPassword(password);

        // Token valid, update user
        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                verificationToken: null,
                tokenExpiry: null
            }
        });

        return res.status(200).json({ message: 'Password changed successfully' });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}


export const protectedRoute = (req: any, res: Response) => {
    res.json({ message: 'Protected route accessed', user: req?.user })
}