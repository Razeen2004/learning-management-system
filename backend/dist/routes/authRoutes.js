"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.post('/send-verify-code', authController_1.SendVerifyEmailCode);
router.post('/verify', authController_1.VerifyEmail); // Assuming this is for email verification
router.get('/protected', authMiddleware_1.authMiddleware, authController_1.protectedRoute);
exports.default = router;
