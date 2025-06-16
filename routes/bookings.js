const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// User routes
router.get('/my', verifyToken, bookingController.getMyBookings);
router.post('/', verifyToken, bookingController.createBooking);
router.delete('/:id', verifyToken, bookingController.cancelBooking);

// Admin routes
router.get('/:id', verifyToken, verifyAdmin, bookingController.getBookingById);
router.get('/', verifyToken, verifyAdmin, bookingController.getAllBookings);
router.post('/admin', verifyToken, verifyAdmin, bookingController.createBookingAdmin);
router.put('/:id', verifyToken, verifyAdmin, bookingController.updateBooking);
router.delete('/admin/:id', verifyToken, verifyAdmin, bookingController.deleteBooking);

module.exports = router;
