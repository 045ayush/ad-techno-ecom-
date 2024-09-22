const { number } = require('zod');
const categoryService = require('../services/category.service');

// Controller to create a new category
async function createCategory(req, res) {
  try {
    const savedCategory = await categoryService.createCategory(req.body);
    res.status(201).send(savedCategory);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controller to update an existing category by ID
async function updateCategory(req, res) {
  try {
    const updatedCategory = await categoryService.updateCategory(Number(req.params.id), req.body);
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controller to delete a category by ID
async function deleteCategory(req, res) {
  try {
    await categoryService.deleteCategory(Number(req.params.id));
    res.status(200).send({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controller to get a category by ID
async function getCategoryById(req, res) {
  try {
    const category = await categoryService.findCategoryById(Number(req.params.id));
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Controller to get all categories
async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
};
