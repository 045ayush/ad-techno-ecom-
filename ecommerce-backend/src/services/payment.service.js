const razorpay = require("../config/razorpayClient.js");
const orderService = require("./order.service.js");
const prisma = require('../prisma/client.js');

const createPaymentLink = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);

    const paymentLinkRequest = {
      amount: order.totalDiscountedPrice * 100, // Convert to paise
      currency: 'INR',
      customer: {
        name: order.user.firstName + ' ' + order.user.lastName,
        contact: order.user.mobile,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `https://ad-techno-ecom-045ayushs-projects.vercel.app/payment/${orderId}`,
      callback_method: 'get',
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    console.log(paymentLink);
    
    const paymentLinkId = paymentLink.id;
    const payment_link_url = paymentLink.short_url;

    // Save payment link ID to the order's paymentDetails in the database
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentDetails: {
          update: {
            paymentLinkId: paymentLinkId,
          },
        },
      },
    });

    // Return the payment link URL and ID in the response
    const resData = {
      paymentLinkId: paymentLinkId,
      payment_link_url,
    };
    return resData;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw new Error(error.message);
  }
};

const updatePaymentInformation = async (reqData,userId) => {
  const payment_id = reqData.paymentId;
  const orderId = Number(reqData.orderId);

  try {
    // Fetch the payment details using the payment ID
    const payment = await razorpay.payments.fetch(payment_id);
    
    if (payment.status === 'captured') {
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
           await prisma.cart.update({
            where: { id: cart.id },
            data: {
              totalPrice: 0,
              totalItem: 0,
              totalDiscountedPrice: 0,
              discount: 0,
            },
          });
      // Update payment details and order status in the database
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentDetails: {
            update: {
              paymentId: payment_id,
              status: 'COMPLETED',
            },
          },
          orderStatus: 'PLACED',
        },
      });

      const resData = { message: 'Your order is placed', success: true };
      return resData;
    } else {
      throw new Error('Payment not captured');
    }
    
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error(error.message);
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };
