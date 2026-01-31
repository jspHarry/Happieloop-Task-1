require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://192.168.35.11:5500',
  'http://10.30.11.94:5500',
  'http://10.30.28.101:5500'
];

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    callback(null, origin); // reflect MY exact origin back to the client
  },
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);

// Connect DB and start
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
