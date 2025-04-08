import express from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Mount Routes

// Health check route


export default app;