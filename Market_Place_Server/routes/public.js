const express = require("express");

const publicController = require("../controllers/public");

const router = express.Router();

// get /api/proudcts
router.get("/products", publicController.getProducts);

// get /api/products/:id
router.get("/product/:id", publicController.getProductDetails);

// get /api/products/filter
router.get("/products/filter", publicController.getProductsByFilter);

module.exports = router;