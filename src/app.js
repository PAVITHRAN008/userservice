import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import cors from 'cors';

const app = express();

//front end and backend connection
app.use(cors({
  origin: 'http://localhost:4200', // Angular dev server
  credentials: true
}));

// Middleware
app.use(express.json());
// Routes
app.use('/api/users',userRoutes);
app.use("/api/auth", authRoutes);


export default app;