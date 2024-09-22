const prisma = require('../prisma/client.js'); // Import your Prisma client
const cartService = require('../services/cart.service.js');

// Create a new order for a user
async function createOrder(user, shippAddress) {
  let address;

  if (shippAddress.id) {
    address = await prisma.address.findUnique({
      where: { id: shippAddress.id },
    });
  } else {
    address = await prisma.address.create({
      data: {
        ...shippAddress,
        user: { connect: { id: user.id } },
      },
    });
  }

  const cart = await cartService.findUserCart(user.id);
  const orderItems = [];

  

  for (const item of cart.cartItems) {
    const orderItem = await prisma.orderItem.create({
      data: {
        price: item.price,
        product:{ connect: { id: item.variant.productId }},
        variant: { connect: { id: item.variantId } },
        quantity: item.quantity,
        discountedPrice: item.discountedPrice,
      },
    });

    orderItems.push(orderItem);
  }

  const createdOrder = await prisma.order.create({
    data: {
      user: { connect: { id: user.id } },
      orderItems: { connect: orderItems.map(item => ({ id: item.id })) },
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      discount: cart.discount,
      totalItem: cart.totalItem,
      shippingAddress: { connect: { id: address.id } },
      orderDate: new Date(),
      paymentDetails: {
        create: {
          status: "PENDING",
        },
      },
      createdAt: new Date(),
    },
  });

  return createdOrder;
}

// Mark an order as confirmed
async function confirmedOrder(orderId) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus: "PLACED" },
  });
}

// Mark an order as shipped
async function shipOrder(orderId) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus: "SHIPPED" },
  });
}

// Mark an order as delivered
async function deliveredOrder(orderId) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus: "DELIVERED" },
  });
}

// Mark an order as cancelled
async function cancelledOrder(orderId) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus: "CANCELLED" },
  });
}

// Find an order by its ID
async function findOrderById(orderId) {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      orderItems: { include: { variant: true,product:true } },
      shippingAddress: true,
    },
  });
}

// Get a user's order history
async function usersOrderHistory(userId) {
  return await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderItems: { include: { variant: true,product:true } },
    },
  });
}

// Get all orders
async function getAllOrders(req) {

  const {
    status,
    sort,
    page = 1,
    pageSize = 10,
  } = req;

  const filter = {};
  if (status) {
    filter.orderStatus = status; // Filter by status if provided   
  }

  let orderBy = {};
  if (sort === "Newest") {
    orderBy = { createdAt: 'desc' }; // Sort by newest first
  } else if (sort === "Oldest") {
    orderBy = { createdAt: 'asc' }; // Sort by oldest first
  }

  const skip = (page - 1) * pageSize; // Calculate skip for pagination

  const orders = await prisma.order.findMany({
    where: filter, // Apply filter
    skip: skip, // Apply pagination
    take: parseInt(pageSize), // Limit the number of results
    orderBy, // Apply sorting
    include: {
      orderItems: { 
        include: { 
          variant: true, 
          product: true 
        } 
      },
    },
  });

  const totalOrders = await prisma.order.count({ where: filter }); // Get total order count for pagination
  const totalPages = Math.ceil(totalOrders / pageSize);

  return { orders, totalPages }; // Return orders and total pages for frontend pagination
}


// Delete an order by its ID
async function deleteOrder(orderId) {
  await prisma.order.delete({
    where: { id: orderId },
  });
}

module.exports = {
  createOrder,
  confirmedOrder,
  shipOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
