require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const surveyRoutes = require('./routes/surveyRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://4zowcs-ip-223-181-34-199.tunnelmole.net', // Update to your current ngrok URL
  'https://crausel-funnel.myshopify.com', // Your test store
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// API Routes (before static and catch-all)
app.use('/api/survey', surveyRoutes);
app.use('/auth', authRoutes);

// Public folder for survey.js
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));