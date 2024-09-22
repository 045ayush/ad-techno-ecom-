const { findUserCart } = require('../services/cart.service');
const cartItemService = require('../services/cartItem.service');

const updateCartItem = async (req, res) => {
    const { cartItemId } = req.params;
    const cartItemData = req.body;

    try {
        const updatedCartItem = await cartItemService.updateCartItem(Number(cartItemId), cartItemData);
        await findUserCart(req.user.id)
        if (!updatedCartItem) {
            return res.status(404).send({ message: 'Cart item not found' });
        }
        res.status(200).send(updatedCartItem);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const removeCartItem = async (req, res) => {
    const { cartItemId } = req.params;

    try {
        await cartItemService.removeCartItem(Number(cartItemId));
        await findUserCart(req.user.id)
        res.status(200).send({ message: 'Cart item removed successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = { updateCartItem, removeCartItem };
