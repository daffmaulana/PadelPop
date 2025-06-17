const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const throttle = require('../middlewares/throttle');

/**Add commentMore actions
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Berhasil login
 *       401:
 *         description: Gagal login
 */

router.post('/login', throttle(2000), authController.login);
/**Add commentMore actions
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Berhasil register
 *       400:
 *         description: Gagal register
 */

router.post('/register', throttle(2000), authController.register);

// Google OAuth
/**
 * @swagger
 * /api/auth/google:
 *   get:Add commentMore actions
 *     summary: Login dengan Google OAuth
 *     tags: [Auth]
 *     description: Redirect ke Google untuk proses login OAuth.
 *     responses:
 *       302:
 *         description: Redirect ke halaman login Google
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
/**Add commentMore actions
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Callback Google OAuth
 *     tags: [Auth]
 *     description: Endpoint callback setelah login Google OAuth. Biasanya akan mengembalikan token atau redirect ke halaman sukses.
 *     responses:
 *       200:
 *         description: Berhasil login dengan Google
 *       401:
 *         description: Gagal login dengan Google
 */
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);

module.exports = router;
