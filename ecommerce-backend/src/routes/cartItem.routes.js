const express=require("express");
const authenticate = require("../middleware/authenticat.js");
const router=express.Router();

const cartItemController=require("../controllers/cartItem.controller.js");

router.put("/:cartItemId",authenticate(),cartItemController.updateCartItem);
router.delete("/:cartItemId",authenticate(),cartItemController.removeCartItem);

module.exports=router;