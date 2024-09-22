const express=require("express");
const router=express.Router();
const productController=require("../controllers/product.controller.js");

router.get('/', productController.getAllProducts);
router.get('/details', productController.getAllProductDetails);
router.get('/:productId', productController.findProductById);
router.get('/category/:categoryId', productController.findProductsByCategory);
router.put('/search', productController.searchProduct);


module.exports = router;