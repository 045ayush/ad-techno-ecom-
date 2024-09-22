const express=require("express");
const router=express.Router();
const productController=require("../controllers/product.controller.js");
const authenticate = require("../middleware/authenticat.js");


router.post('/',authenticate(["ADMIN"]), productController.createProduct);
router.post('/creates',authenticate(["ADMIN"]), productController.createMultipleProduct);
router.delete('/:productId',authenticate(["ADMIN"]), productController.deleteProduct);
router.put('/:productId',authenticate(["ADMIN"]), productController.updateProduct);

module.exports=router;