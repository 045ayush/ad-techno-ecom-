const prisma = require('../prisma/client'); // Import your Prisma client

// Create a new cart for a user
async function createCart(userId) {
  const cart = await prisma.cart.create({
    data: { userId },
  });
  return cart;
}

// Find a user's cart and update cart details
async function findUserCart(userId) {
  console.log("hello");
  let cart = await prisma.cart.findUnique({
    where:  {userId:userId} ,
    include: {
      cartItems: {
        include: { variant: true,product:true } // Including variant details instead of product
      }
    }
  });

  if (!cart) {
    throw new Error(`Cart not found for user: ${userId}`);
  }

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  for (const cartItem of cart.cartItems) {
    totalPrice += cartItem.price * cartItem.quantity;
    totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity;
    totalItem += cartItem.quantity;
  }

  cart.totalPrice = totalPrice;
  cart.totalItem = totalItem;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.discount = totalPrice - totalDiscountedPrice;

  const updatedCart = await prisma.cart.update({
    where: { id: cart.id },
    data: {
      totalPrice,
      totalItem,
      totalDiscountedPrice,
      discount: cart.discount,
    },
  });

  return cart;
}

// Add an item to the user's cart
async function addCartItem(userId, req) {
  console.log("hiiii");
  
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error(`Cart not found for user: ${userId}`);
  }

  const variant = await prisma.variant.findUnique({
    where: { id: req.variantId }, // Referencing variant instead of product
  });

  if (!variant) {
    throw new Error(`Variant not found with ID: ${req.variantId}`);
  }



  const existingCartItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, variantId: variant.id },
  });

  if (!existingCartItem) {
    const cartItem = await prisma.cartItem.create({
      data: {
        productId:variant.productId,
        variantId: variant.id, // Referencing variantId
        cartId: cart.id,
        quantity: req.quantity || 1, // Default to 1 if not specified
        price: variant.price, // Using variant price
        discountedPrice: variant.discountedPrice,
      },
    });

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        cartItems: {
          connect: { id: cartItem.id },
        },
      },
    });

    await findUserCart(userId)


    return 'Item added to cart';
  }
  const cartItem=await prisma.cartItem.update({
    where:{id:existingCartItem.id},
    data:{
      quantity:existingCartItem.quantity+1,
    }
  })

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      cartItems: {
        connect: { id: cartItem.id },
      },
    },
  });

  await findUserCart(userId)

  return 'quantity increased';
}

// Empty cart 
async function emptyCart(userId) {
  // Find the user's cart
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new Error(`Cart not found for user: ${userId}`);
  }

  // Delete all cart items associated with the cart
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  // Reset cart totals
  const updatedCart = await prisma.cart.update({
    where: { id: cart.id },
    data: {
      totalPrice: 0,
      totalItem: 0,
      totalDiscountedPrice: 0,
      discount: 0,
    },
  });

  return 'Cart has been emptied successfully';
}

module.exports = { createCart, findUserCart, addCartItem,emptyCart };
