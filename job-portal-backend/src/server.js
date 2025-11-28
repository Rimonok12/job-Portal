import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

// Connect DB FIRST
connectDB();

const app = express();

// Middlewares
// app.use(cors());
app.use(
  cors({
    origin: process.env.CORS,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Test
app.get('/', (req, res) => {
  res.json({ message: 'Job Portal API is running' });
});

// Start
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// testing
app.post('/test', (req, res) => {
  res.json({
    message: 'POST /test reached the server!',
    body: req.body,
  });
});
