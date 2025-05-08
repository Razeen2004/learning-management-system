// src/index.ts
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import adminRoutes from './routes/adminRoutes'
import dotenv from 'dotenv';
import './utils/ignoreSelfSignedCerts.js';


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));


dotenv.config()
const port = Number(process.env.PORT) || 5000;

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`)
})