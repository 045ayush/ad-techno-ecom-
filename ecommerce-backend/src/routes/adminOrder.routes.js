const express=require("express");
const authenticate = require("../middleware/authenticat.js");
const router=express.Router();
const adminOrderController=require("../controllers/adminOrder.controller.js")

router.get("/",authenticate(["ADMIN"]),adminOrderController.getAllOrders);
router.put("/:orderId/confirmed",authenticate(["ADMIN"]),adminOrderController.confirmedOrder);
router.put("/:orderId/ship",authenticate(["ADMIN"]),adminOrderController.shippOrder);
router.put("/:orderId/deliver",authenticate(["ADMIN"]),adminOrderController.deliverOrder);
router.put("/:orderId/cancel",authenticate(["ADMIN"]),adminOrderController.cancelledOrder);
router.delete("/:orderId/delete",authenticate(["ADMIN"]),adminOrderController.deleteOrder);

module.exports=router;