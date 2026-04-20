// ============================================================
// server.js - Main entry point for the Express application
// Initializes Express, connects to MongoDB, and registers routes
// ============================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import route handlers
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Initialize the Express app
const app = express();

// ── Middleware ────────────────────────────────────────────────
// Enable Cross-Origin Resource Sharing (allows the React frontend to call this API)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
// Mount each feature's routes at its own path prefix
app.use('/api/auth', authRoutes);       // POST /api/auth/register, /api/auth/login
app.use('/api/courses', courseRoutes);  // GET /api/courses, /api/courses/:id
app.use('/api/bookings', bookingRoutes);// POST /api/bookings, GET /api/bookings/my
app.use('/api/payment', paymentRoutes); // POST /api/payment/process

// ── Health Check ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Course Reservation API is running ✅' });
});

// ── MongoDB Connection + Server Start ─────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/course_reservation';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
