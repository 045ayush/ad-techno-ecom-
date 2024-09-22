const prisma = require('../prisma/client'); // Import your Prisma client

// Create a new variant
async function createVariant(variantData) {
  const savedVariant = await prisma.variant.create({
    data: {
      variantName: variantData.variantName,
      productId: variantData.productId,
      price: variantData.price,
      discountedPrice: variantData.discountedPrice,
      discountPercentage: variantData.discountPercentage,
      quantity: variantData.quantity,
      images: variantData.images,
      specifications: variantData.specifications,
    },
  });

  return savedVariant;
}

// Delete a variant by ID
async function deleteVariant(variantId) {
  const variant = await prisma.variant.findUnique({
    where: { id: variantId },
  });

  if (!variant) {
    throw new Error("Variant not found with id - " + variantId);
  }

  await prisma.variant.delete({
    where: { id: variantId },
  });

  return "Variant deleted Successfully";
}

// Update a variant by ID
async function updateVariant(variantId, variantData) {
  const updatedVariant = await prisma.variant.update({
    where: { id: variantId },
    data: variantData,
  });

  return updatedVariant;
}

// Find a variant by ID
async function findVariantById(id) {
  const variant = await prisma.variant.findUnique({
    where: { id },
    include: {
      product: true,
    },
  });

  if (!variant) {
    throw new Error("Variant not found with id " + id);
  }

  return variant;
}

// Get all variants for a specific product
async function getVariantsByProductId(productId) {
  const variants = await prisma.variant.findMany({
    where: { productId },
  });

  return variants;
}

module.exports = {
  createVariant,
  deleteVariant,
  updateVariant,
  findVariantById,
  getVariantsByProductId,
};
