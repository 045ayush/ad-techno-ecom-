const express = require("express");
const authenticate = require("../middleware/authenticat.js");
const router = express.Router();
const ratingController = require("../controllers/rating.controller.js");

router.post("/create",authenticate(),ratingController.createRating);
router.get("/:productId",authenticate(),ratingController.getProductsRating);
// router.get("/avg/:productId",authenticate(),ratingController.getAverageRating);



module.exports=router;