import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

// Resolve directory paths in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables (from root directory)
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for the hackathon presentation
  credentials: true
}));
app.use(express.json());

// Routes Mountings
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/ai', aiRoutes);

// Simple Status Check Route
app.get('/status', (req, res) => {
  res.json({ success: true, message: 'CareerBridge AI MERN API running successfully!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
});
