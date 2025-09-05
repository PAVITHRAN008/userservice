import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();
const app = express();
//front end and backend connection
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:4200', process.env.FRONTEND_URL],
  credentials: true
})

);

// Middleware
app.use(express.json());
// Routes
app.use('/api/users',userRoutes);
app.use("/api/auth", authRoutes);


export default app;