const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Request validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
};

// Apply middleware
router.use(requestLogger);

// Routes with validation
router.use('/auth', require('../routes/auth'));
router.use('/fields', require('../routes/fields'));
router.use('/bookings', require('../routes/bookings'));
router.use('/users', require('../routes/userRoutes'));

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = router;