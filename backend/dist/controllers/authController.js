"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = exports.RecoverPassword = exports.SendRecoveryPhrase = exports.VerifyEmail = exports.SendVerifyEmailCode = exports.loginWithGoogle = exports.login = exports.signup = void 0;
const authService_1 = require("../services/authService");
const jwt_1 = require("../utils/jwt");
const authValidators_1 = require("../validators/authValidators");
const prisma_1 = __importDefault(require("../utils/prisma"));
const mail_1 = __importStar(require("../utils/mail"));
// Signup the user, with the given name, email and password....
const signup = async (req, res) => {
    console.log("request hit");
    try {
        const { name, email, password, role } = authValidators_1.SignupSchema.parse(req.body);
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const user = await (0, authService_1.createUser)({ name, email, password, role, image: null });
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.signup = signup;
// Login the user, with the given email and password....
const login = async (req, res) => {
    try {
        const { email, password } = authValidators_1.LoginSchema.parse(req.body);
        const user = await (0, authService_1.validateCredentials)(email, password);
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            role: user.role,
            image: user.image,
            token: token
        });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.login = login;
const loginWithGoogle = async (req, res) => {
    try {
        const { email, name, image } = req.body;
        // Check if user exists
        let user = await prisma_1.default.user.findUnique({ where: { email }, select: { id: true, name: true, email: true, isVerified: true, role: true, image: true } });
        if (!user) {
            // If user doesn't exist, create the user
            const newUser = await (0, authService_1.createUser)({ name, email, password: "", isVerified: true, role: "STUDENT", image });
            const token = (0, jwt_1.generateToken)(newUser.id, newUser.role);
            return res.status(201).json({
                message: "User created successfully",
                user: { ...newUser, token },
            });
        }
        if (user?.image == null) {
            // Update the user with the image URL if it is null
            const updatedImageUser = await prisma_1.default.user.update({
                where: { email },
                data: { image },
                select: { id: true, name: true, email: true, isVerified: true, role: true, image: true }
            });
        }
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        // If user exists, return user object
        return res.status(200).json({
            message: "User already exists",
            user: { ...user, token },
        });
    }
    catch (error) {
        console.error("Error in Google login handler:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};
exports.loginWithGoogle = loginWithGoogle;
// Send the Verification token to the email, after getting their email....
const SendVerifyEmailCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
        const updatedUser = await prisma_1.default.user.update({
            where: { email },
            data: {
                verificationToken: verificationCode,
                tokenExpiry: tokenExpiry
            }
        });
        (0, mail_1.default)(email, "Email Verification - Life Long Learning", `${verificationCode}`, email);
        res.status(200).json({ message: 'Verification email sent' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.SendVerifyEmailCode = SendVerifyEmailCode;
// Verify the email, with the given password token from email....
const VerifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: { email }
        });
        if (!user || !user.verificationToken || !user.tokenExpiry) {
            return res.status(404).json({ message: 'User or Token is not correct!' });
        }
        const now = new Date();
        // Check if token expired
        if (now > user.tokenExpiry) {
            await prisma_1.default.user.update({
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
        await prisma_1.default.user.update({
            where: { email },
            data: {
                isVerified: true,
                verificationToken: null,
                tokenExpiry: null
            }
        });
        return res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.VerifyEmail = VerifyEmail;
// Send the recovery phase to the email, for forgotting password....
const SendRecoveryPhrase = async (req, res) => {
    console.log("API HIT");
    try {
        const { email } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
        const updatedUser = await prisma_1.default.user.update({
            where: { email },
            data: { verificationToken: verificationCode, tokenExpiry }
        });
        (0, mail_1.SendRecoveryMail)(email, "Password Recovery - Life Long Learning", verificationCode, email);
        res.status(200).json({ message: 'Recovery email sent' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.SendRecoveryPhrase = SendRecoveryPhrase;
// Recover the password, by the email verification and new password....
const RecoverPassword = async (req, res) => {
    try {
        const { email, password, verificationCode } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: { email }
        });
        if (!user || !user.verificationToken || !user.tokenExpiry) {
            return res.status(404).json({ message: 'User or Token is not correct!' });
        }
        const now = new Date();
        if (now > user.tokenExpiry) {
            await prisma_1.default.user.update({
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
        const hashedPassword = await (0, authService_1.createNewPassword)(password);
        // Token valid, update user
        await prisma_1.default.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                verificationToken: null,
                tokenExpiry: null
            }
        });
        return res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.RecoverPassword = RecoverPassword;
const protectedRoute = (req, res) => {
    res.json({ message: 'Protected route accessed', user: req?.user });
};
exports.protectedRoute = protectedRoute;
