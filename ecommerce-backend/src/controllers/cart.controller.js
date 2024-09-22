const cartService = require('../services/cart.service');
const cartItemService = require('../services/cartItem.service');

// Controller function to find a user's cart
const findUserCart = async (req, res) => {
    const  userId  = req.user.id;
    try {
        const cart = await cartService.findUserCart(userId);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to add an item to the cart
const addItemToCart = async (req, res) => {    
    const  userId  = req.user.id;
    const cartItemData = req.body;
    try {
        const response = await cartService.addCartItem(userId,cartItemData);
            res.status(200).json(response);
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to empty a user's cart
const emptyCart = async (req, res) => {
    const userId = req.user.id;
    try {
        const response = await cartService.emptyCart(userId);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    findUserCart,
    addItemToCart,
    emptyCart
};
