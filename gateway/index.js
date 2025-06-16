const express = require('express');
const router = express.Router();

router.use('/auth', require('../routes/auth'));
router.use('/fields', require('../routes/fields'));
router.use('/bookings', require('../routes/bookings'));
router.use('/users', require('../routes/userRoutes'));

module.exports = router;