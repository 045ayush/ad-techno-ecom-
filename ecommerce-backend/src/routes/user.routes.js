const express=require("express");

const router=express.Router();
const userController=require("../controllers/user.controller.js");
const authenticate = require("../middleware/authenticat.js");

router.get("/",authenticate(["ADMIN"]),userController.getAllUsers)
router.get("/profile",userController.getUserProfile)
router.get("/:userId",userController.getUserById)


module.exports=router;