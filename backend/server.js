import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoutes from './routes/users.js';
import authRoutes from "./routes/authRoutes.js"
import problemRoutes from './routes/problems.js';
import solutionRoutes from './routes/solutions.js';
import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/Project.js';
import chatbotRoutes from './routes/chatbot.js';
import gmeet from './routes/getToken.js'
import cors from 'cors'
// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/solutions', solutionRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/auth',authRoutes)
app.use('/',gmeet);
app.get('/', (req, res) => {
  res.send('API is running ...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
