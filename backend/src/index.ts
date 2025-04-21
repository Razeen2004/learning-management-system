// src/index.ts
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


dotenv.config()

const port = process.env.PORT || 5000;

// Routes
app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})