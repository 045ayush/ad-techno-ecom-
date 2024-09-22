const prisma = require('../prisma/client'); // Import your Prisma client
const productService = require('./product.service'); // Adjusted path for product service

// Create a new review
async function createReview(reqData, user) {
  // Check if the product exists
  const product = await productService.findProductById(reqData.productId);

  if (!product) {
    throw new Error(`Product not found with ID ${reqData.productId}`);
  }

  // Check if a review by this user for this product already exists
  const existingReview = await prisma.review.findFirst({
    where: {
      productId: reqData.productId,
      userId: user.id,
    },
  });

  if (existingReview) {
    throw new Error(`User with ID ${user.id} has already reviewed this product`);
  }

  // Create the review
  const review = await prisma.review.create({
    data: {
      userId: user.id,
      productId: product.id,
      review: reqData.review,
      createdAt: new Date(),
    },
  });

  return review;
}

// Get all reviews for a product
async function getAllReviews(productId) {
  // Check if the product exists
  const product = await productService.findProductById(productId);

  if (!product) {
    throw new Error(`Product not found with ID ${productId}`);
  }

  // Fetch all reviews for the product
  const reviews = await prisma.review.findMany({
    where: { productId },
    include: {
      user: true, // Fetch user details along with reviews
    },
  });

  return reviews;
}

// Get a review by ID
async function getReviewById(reviewId) {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      user: true, // Fetch user details along with review
      product: true, // Fetch product details along with review
    },
  });

  if (!review) {
    throw new Error(`Review not found with ID ${reviewId}`);
  }

  return review;
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
};
