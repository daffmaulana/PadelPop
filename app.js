require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const limiter = require('./middlewares/rateLimit');
const path = require('path');
const { verifyToken, verifyAdmin } = require('./middlewares/authMiddleware');
require('./config/passport'); // Setup Google OAuth

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static('public'));
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/fields', require('./routes/fields'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/userRoutes'));

module.exports = app;