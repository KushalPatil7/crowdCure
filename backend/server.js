import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import userRoutes from './routes/users.js';
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from './routes/problems.js';
import solutionRoutes from './routes/solutions.js';
import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/Project.js';
import chatbotRoutes from './routes/chatbot.js';
import gmeet from './routes/getToken.js';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

dotenv.config();
try {
  await connectDB();
  console.info("MongoDB Connected");
} catch (error) {
  console.info(error);
}

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/gmeet', gmeet);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));