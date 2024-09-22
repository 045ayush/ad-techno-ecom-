const prisma = require('../prisma/client'); // Import your Prisma client
const productService = require('./product.service'); // Adjusted path for product service

// Create a new rating
async function createRating(req, user) {

  
  
  
  // Check if the product exists
  const product = await productService.findProductById(req.productId);

  if (!product) {
    throw new Error(`Product with ID ${req.productId} not found`);
  }

  // Check if a rating by this user for this product already exists
  const existingRating = await prisma.rating.findFirst({
    where: {
      productId: req.productId,
      userId: user.id,
    },
  });

  if (existingRating) {
    throw new Error(`User with ID ${user.id} has already rated this product`);
  }

  // Create the rating
  const rating = await prisma.rating.create({
    data: {
      productId: req.productId,
      userId: user.id,
      rating: req.rating,
      createdAt: new Date(),
    },
  });

  return rating;
}

// Get ratings for a product by product ID
async function getProductRatings(productId) {
  // Fetch all ratings for a given product
  const ratings = await prisma.rating.findMany({
    where: { productId },
    include: {
      user: true, // Include user details if needed
    },
  });

  return ratings;
}

// Get the average rating for a product
async function getAverageRating(productId) {
  // Calculate the average rating for a given product
  const averageRating = await prisma.rating.aggregate({
    where: { productId },
    _avg: {
      rating: true,
    },
  });

  return averageRating._avg.rating || 0;
}

module.exports = {
  createRating,
  getProductRatings,
  getAverageRating,
};
