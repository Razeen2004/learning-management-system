"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = exports.VerifyEmail = exports.SendVerifyEmailCode = exports.login = exports.signup = void 0;
const authService_1 = require("../services/authService");
const jwt_1 = require("../utils/jwt");
const authValidators_1 = require("../validators/authValidators");
const prisma_1 = __importDefault(require("../utils/prisma"));
const mail_1 = __importDefault(require("../utils/mail"));
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = authValidators_1.SignupSchema.parse(req.body);
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const user = await (0, authService_1.createUser)({ name, email, password, role });
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = authValidators_1.LoginSchema.parse(req.body);
        const user = await (0, authService_1.validateCredentials)(email, password);
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });
        // const token = generateToken(user.id, user.role);
        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            role: user.role,
        });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.login = login;
const SendVerifyEmailCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const updatedUser = await prisma_1.default.user.update({
            where: { email },
            data: { verificationToken: verificationCode }
        });
        (0, mail_1.default)(email, "Email Verification - Life Long Learning", `${verificationCode}`, email);
        res.status(200).json({ message: 'Verification email sent' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.SendVerifyEmailCode = SendVerifyEmailCode;
const VerifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const user = await prisma_1.default.user.findFirst({ where: {
                email,
                verificationToken: verificationCode
            } });
        if (!user)
            return res.status(404).json({ message: 'User or Token is not Correct!' });
        const updatedUser = await prisma_1.default.user.update({
            where: { email },
            data: { isVerified: true, verificationToken: null }
        });
        res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.VerifyEmail = VerifyEmail;
const protectedRoute = (req, res) => {
    res.json({ message: 'Protected route accessed', user: req?.user });
};
exports.protectedRoute = protectedRoute;
