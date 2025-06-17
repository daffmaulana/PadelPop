const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan semua user (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar semua user
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);
/**Add commentMore actions
 * @swagger
 * /users:
 *   post:
 *     summary: Membuat user baru (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.post('/', verifyToken, verifyAdmin, userController.createUser);
/**Add commentMore actions
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update data user (admin)
 *     tags: [Users]
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
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User berhasil diupdate
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.put('/:id', verifyToken, verifyAdmin, userController.updateUser);
/**Add commentMore actions
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Hapus user (admin)
 *     tags: [Users]
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
 *         description: User berhasil dihapus
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUser);

module.exports = router;