const express=require("express");
const router=express.Router();
const variantController=require("../controllers/variant.controller.js");
const authenticate = require("../middleware/authenticat.js");


router.post('/',authenticate(["ADMIN"]), variantController.createVariant);
router.delete('/:variantId',authenticate(["ADMIN"]), variantController.deleteVariant);
router.get('/:productId',authenticate(), variantController.getVariantsByProductId);
router.get('/id/:variantId',authenticate(), variantController.findVariantById);
router.put('/:variantId',authenticate(["ADMIN"]), variantController.updateVariant);


module.exports=router;