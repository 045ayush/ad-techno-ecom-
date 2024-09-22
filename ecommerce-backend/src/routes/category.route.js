const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authenticate = require('../middleware/authenticat');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin routes
router.post('/', authenticate(["ADMIN"]), categoryController.createCategory);
router.put('/:id', authenticate(["ADMIN"]), categoryController.updateCategory);
router.delete('/:id', authenticate(["ADMIN"]), categoryController.deleteCategory);

module.exports = router;
