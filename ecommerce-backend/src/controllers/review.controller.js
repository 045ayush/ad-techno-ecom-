const reviewService = require('../services/review.service');

const createReview = async (req, res) => {
    try {
        const reviewData = req.body;
        const user = req.user; // Assuming user is added to req by authentication middleware

        const newReview = await reviewService.createReview(reviewData, user);
        res.status(201).send(newReview);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAllReview = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await reviewService.getAllReviews(Number(productId));
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createReview,
    getAllReview,
};
