const variantService = require('../services/variant.service');

const createVariant = async (req, res) => {
    const variantData = req.body;

    try {
        const newVariant = await variantService.createVariant(variantData);
        res.status(201).send(newVariant);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deleteVariant = async (req, res) => {
    const { variantId } = req.params;

    try {
        await variantService.deleteVariant(Number(variantId));
        res.status(200).send({ message: 'Variant deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateVariant = async (req, res) => {
    const { variantId } = req.params;
    const variantData = req.body;

    try {
        const updatedVariant = await variantService.updateVariant(Number(variantId), variantData);
        if (!updatedVariant) {
            return res.status(404).send({ message: 'Variant not found' });
        }
        res.status(200).send(updatedVariant);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const findVariantById = async (req, res) => {
    const { variantId } = req.params;

    try {
        const variant = await variantService.findVariantById(Number(variantId));
        if (!variant) {
            return res.status(404).send({ message: 'Variant not found' });
        }
        res.status(200).send(variant);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getVariantsByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const variants = await variantService.getVariantsByProductId(Number(productId));
        res.status(200).send(variants);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createVariant,
    deleteVariant,
    updateVariant,
    findVariantById,
    getVariantsByProductId,
};
