const productService = require('../services/product.service');

const createProduct = async (req, res) => {
    const productData = req.body;

    try {
        const newProduct = await productService.createProduct(productData);
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        await productService.deleteProduct(Number(productId));
        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const productData = req.body;

    try {
        const updatedProduct = await productService.updateProduct(Number(productId), productData);
        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    const query = req.query;

    try {
        const products = await productService.getAllProducts(query);
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAllProductDetails = async (req, res) => {
    const query = req.query;

    try {
        const products = await productService.getAllProductDetails(query);
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const findProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await productService.findProductById(Number(productId));
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const findProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const products = await productService.findProductsByCategory(Number(categoryId));
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const searchProduct = async (req, res) => {
    const { searchTerm } = req.query;

    try {
        const products = await productService.searchProduct(searchTerm);
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const createMultipleProduct = async (req, res) => {
    const products = req.body;

    try {
        const newProducts = await productService.createMultipleProducts(products);
        res.status(201).send(newProducts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    findProductsByCategory,
    searchProduct,
    createMultipleProduct,
    getAllProductDetails
};
