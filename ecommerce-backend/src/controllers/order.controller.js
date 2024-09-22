const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    const shippingAddress  = req.body;

    try {
        const newOrder = await orderService.createOrder(req.user, shippingAddress);
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const findOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await orderService.findOrderById(Number(orderId));
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const orderHistory = async (req, res) => {
    const  userId  = req.user.id;

    try {
        const orders = await orderService.usersOrderHistory(userId);
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { createOrder, findOrderById, orderHistory };
