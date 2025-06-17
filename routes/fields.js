const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /fields:
 *   get:
 *     summary: Mendapatkan semua lapangan
 *     tags: [Fields]Add commentMore actions
 *     responses:
 *       200:
 *         description: Daftar semua lapangan
 */
router.get('/', fieldController.getAllFields);
/**
 * @swagger
 * /fields/{id}:
 *   get:
 *     summary: Mendapatkan detail lapangan
 *     tags: [Fields]
 *     parameters:
 *       - in: pathAdd commentMore actions
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detail lapangan
 *       404:
 *         description: Lapangan tidak ditemukan
 */
router.get('/:id', fieldController.getFieldById);

// admin
/**Add commentMore actions
 * @swagger
 * /fields:
 *   post:
 *     summary: Membuat lapangan baru (admin)
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lapangan berhasil dibuat
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.post('/', verifyToken, verifyAdmin, fieldController.createField);
/**Add commentMore actions
 * @swagger
 * /fields/{id}:
 *   put:
 *     summary: Update data lapangan (admin)
 *     tags: [Fields]
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
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lapangan berhasil diupdate
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.put('/:id', verifyToken, verifyAdmin, fieldController.updateField);
/**Add commentMore actions
 * @swagger
 * /fields/{id}:
 *   delete:
 *     summary: Hapus lapangan (admin)
 *     tags: [Fields]
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
 *         description: Lapangan berhasil dihapus
 *       401:
 *         description: Token tidak ditemukan/invalid
 *       403:
 *         description: Hanya untuk admin
 */
router.delete('/:id', verifyToken, verifyAdmin, fieldController.deleteField);

module.exports = router;