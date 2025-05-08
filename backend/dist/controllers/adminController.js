"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserRole = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
// Get all users from the database
const getUsers = async (req, res) => {
    try {
        const admin = req.body.user;
        const checkUser = await prisma_1.default.user.findUnique({ where: {
                id: admin.id,
                role: admin.role
            } });
        if (!checkUser)
            return res.status(401).json({ message: 'Unauthorized' });
        const users = await prisma_1.default.user.findMany({
            where: {},
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isVerified: true,
            }
        });
        if (!users)
            return res.status(404).json({ message: 'No users found' });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getUsers = getUsers;
const changeUserRole = async (req, res) => {
    try {
        const admin = req.body.user; // Make sure this is added by secure auth middleware
        const { id, role } = req.body;
        // Only allow admins to change roles
        if (admin.role !== "ADMIN") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Validate new role
        const validRoles = ["ADMIN", "TEACHER", "STUDENT"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role specified" });
        }
        // Check if user exists
        const user = await prisma_1.default.user.findUnique({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update user role
        const updatedUser = await prisma_1.default.user.update({
            where: { id },
            data: { role },
        });
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.changeUserRole = changeUserRole;
