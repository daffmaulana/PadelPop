const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);
router.post('/', verifyToken, verifyAdmin, userController.createUser);
router.put('/:id', verifyToken, verifyAdmin, userController.updateUser);
router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUser);

module.exports = router;