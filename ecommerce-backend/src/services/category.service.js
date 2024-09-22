const prisma = require('../prisma/client'); // Import your Prisma client

// Create a new category
async function createCategory(data) {
  const savedCategory = await prisma.category.create({
    data: {
      name: data.name,
    },
  });

  return savedCategory;
}

// Update a category by ID
async function updateCategory(categoryId, data) {
  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: data.name,
    },
  });

  return updatedCategory;
}

// Delete a category by ID
async function deleteCategory(categoryId) {
  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found with id - " + categoryId);
  }

  await prisma.category.delete({
    where: { id: categoryId },
  });

  return "Category deleted Successfully";
}

// Find a category by ID
async function findCategoryById(categoryId) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found with id " + categoryId);
  }

  return category;
}

// Get all categories
async function getAllCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  findCategoryById,
  getAllCategories,
};
