// src/index.ts
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'
import SendMail from './utils/mail'
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

app.use('/api/auth', authRoutes);

// SendMail("razeenbaig10@gmail.com", "Test Email", "This is a test email from Node.js");


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})