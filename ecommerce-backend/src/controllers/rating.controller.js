const ratingService = require('../services/rating.service');

const createRating = async (req, res) => {
    try {
        const ratingData = req.body;
        const user = req.user; // Assuming user is added to req by authentication middleware
        

        const newRating = await ratingService.createRating(ratingData, user);
        res.status(201).send(newRating);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getProductsRating = async (req, res) => {
    try {
        const { productId } = req.params;

        const ratings = await ratingService.getProductRatings(Number(productId));
        res.status(200).send(ratings);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createRating,
    getProductsRating,
};
