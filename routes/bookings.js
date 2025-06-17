const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');
const throttle = require('../middlewares/throttle');

// User routes
/**Add commentMore actions
 * @swagger
 * /bookings/my:
 *   get:
 *     summary: Mendapatkan daftar booking milik user yang sedang login
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar booking user
 *       401:
 *         description: Token tidak ditemukan/invalid
 */
router.get('/my', verifyToken, bookingController.getMyBookings);
/**Add commentMore actions
 * @swagger
 * /bookings:
 *   post:
 *     summary: Membuat booking baru (user)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking berhasil dibuat
 *       401:
 *         description: Token tidak ditemukan/invalid
 */
router.post('/', throttle(2000), verifyToken, bookingController.createBooking);
/**Add commentMore actions
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Membatalkan booking milik user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking berhasil dibatalkan
 *       401:
 *         description: Token tidak ditemukan/invalid
 */
router.delete('/:id', verifyToken, bookingController.cancelBooking);

// Admin routes
/**Add commentMore actions
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Mendapatkan detail booking (admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detail booking
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.get('/:id', verifyToken, verifyAdmin, bookingController.getBookingById);
/**Add commentMore actions
 * @swagger
 * /bookings:
 *   get:
 *     summary: Mendapatkan semua booking (admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar semua booking
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.get('/', verifyToken, verifyAdmin, bookingController.getAllBookings);
/**Add commentMore actions
 * @swagger
 * /bookings/admin:
 *   post:
 *     summary: Membuat booking baru oleh admin
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldId:
 *                 type: string
 *               userId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking berhasil dibuat oleh admin
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.post('/admin', verifyToken, verifyAdmin, bookingController.createBookingAdmin);
/**Add commentMore actions
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update booking (admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldId:
 *                 type: string
 *               userId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking berhasil diupdate
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.put('/:id', verifyToken, verifyAdmin, bookingController.updateBooking);
/**Add commentMore actions
 * @swagger
 * /bookings/admin/{id}:
 *   delete:
 *     summary: Hapus booking oleh admin
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking berhasil dihapus oleh admin
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.delete('/admin/:id', verifyToken, verifyAdmin, bookingController.deleteBooking);

module.exports = router;
