const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.get('/', fieldController.getAllFields);
router.get('/:id', fieldController.getFieldById);

// admin
router.post('/', verifyToken, verifyAdmin, fieldController.createField);
router.put('/:id', verifyToken, verifyAdmin, fieldController.updateField);
router.delete('/:id', verifyToken, verifyAdmin, fieldController.deleteField);

module.exports = router;