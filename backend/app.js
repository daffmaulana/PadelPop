require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const limiter = require('./middlewares/rateLimit');
const path = require('path');
require('./config/passport');

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use(limiter);

// Gunakan gateway
const apiGateway = require('./gateway');
app.use('/api', apiGateway);

module.exports = app;