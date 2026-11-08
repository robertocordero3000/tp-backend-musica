const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyToken = require('../middleware/verifyToken');

// Rutas públicas
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Rutas protegidas con JWT
router.post('/', verifyToken, categoryController.createCategory);
router.delete('/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;