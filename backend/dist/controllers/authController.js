"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = exports.login = exports.signup = void 0;
const authService_1 = require("../services/authService");
const jwt_1 = require("../utils/jwt");
const authValidators_1 = require("../validators/authValidators");
const prisma_1 = __importDefault(require("../utils/prisma"));
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
        console.log("Incoming body:", req.body);
        const { email, password } = authValidators_1.LoginSchema.parse(req.body);
        const user = await (0, authService_1.validateCredentials)(email, password);
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });
        const token = (0, jwt_1.generateToken)(user.id, user.role);
        res.json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = login;
const protectedRoute = (req, res) => {
    res.json({ message: 'Protected route accessed', user: req?.user });
};
exports.protectedRoute = protectedRoute;
