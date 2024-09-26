import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js"
import userRoutes from './routes/users.js'
import problemRoutes from './routes/problems.js'
import solutionRoutes from './routes/solutions.js'
import profileRoutes from './routes/profile.js'
import project from './routes/Project.js'
//Load environment variable
dotenv.config();

// Connect to MongoDB
connectDB()

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',userRoutes)
app.use('/api/problems',problemRoutes)
app.use('/api/solutions',solutionRoutes)
app.use('/api/profile', profileRoutes);
app.use('/api/projects',project)

app.get('/',(req,res)=>{
  res.send('API is running ...');
})

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})