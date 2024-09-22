const orderService = require('../services/order.service');

// Controller function to get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders(req.query);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller function to confirm an order
const confirmedOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        await orderService.confirmedOrder(Number(orderId));
        res.status(200).json({ message: 'Order confirmed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to ship an order
const shippOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        await orderService.shipOrder(Number(orderId));
        res.status(200).json({ message: 'Order shipped' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to deliver an order
const deliverOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        await orderService.deliveredOrder(Number(orderId));
        res.status(200).json({ message: 'Order delivered' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to cancel an order
const cancelledOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        await orderService.cancelledOrder(Number(orderId));
        res.status(200).json({ message: 'Order cancelled' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete an order
const deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        await orderService.deleteOrder(Number(orderId));
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOrders,
    confirmedOrder,
    shippOrder,
    deliverOrder,
    cancelledOrder,
    deleteOrder,
};
