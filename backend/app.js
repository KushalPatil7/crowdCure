import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import answerRoutes from './routes/answer.routes.js';
import questionRoutes from './routes/question.routes.js';
import projectRoutes from './routes/project.routes.js';
import cookieParser from 'cookie-parser';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/users",userRoutes)
app.use("/api/v1/answers",answerRoutes)
app.use("/api/v1/question",questionRoutes)
app.use("/api/v1/project",projectRoutes)



export default app;