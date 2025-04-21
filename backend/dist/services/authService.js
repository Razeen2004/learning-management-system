"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = exports.createUser = void 0;
// src/services/authService.ts
const prisma_1 = __importDefault(require("../utils/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (userData) => {
    const hashedPassword = await bcryptjs_1.default.hash(userData.password, 12);
    return prisma_1.default.user.create({
        data: {
            ...userData,
            password: hashedPassword,
            role: userData.role || 'STUDENT'
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    });
};
exports.createUser = createUser;
const validateCredentials = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user || !user.password)
        return null;
    const isValid = await bcryptjs_1.default.compare(password, user.password);
    return isValid ? user : null;
};
exports.validateCredentials = validateCredentials;
