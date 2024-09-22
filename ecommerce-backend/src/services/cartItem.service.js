const { empty } = require('@prisma/client/runtime/library');
const prisma = require('../prisma/client.js'); // Import your Prisma client



// Update an existing cart item
async function updateCartItem(cartItemId, cartItemData) {
  const item = await findCartItemById(cartItemId);

  if (!item) {
    throw new Error(`Cart item not found with id: ${cartItemId}`);
  }

  const variant = await prisma.variant.findUnique({
    where: { id: item.variantId },
  });

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: {
      quantity: cartItemData.quantity,
      price: cartItemData.quantity * variant.price,
      discountedPrice: cartItemData.quantity * variant.discountedPrice,
    },
  });

  return updatedCartItem;
}



// Remove a cart item
async function removeCartItem(cartItemId) {
  const cartItem = await findCartItemById(cartItemId);

  if (!cartItem) {
    throw new Error(`CartItem not found with id: ${cartItemId}`);
  }

  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });
}

// Find a cart item by its ID
async function findCartItemById(cartItemId) {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    include: { variant: true },
  });

  if (cartItem) {
    return cartItem;
  } else {
    throw new Error(`CartItem not found with id: ${cartItemId}`);
  }
}

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
