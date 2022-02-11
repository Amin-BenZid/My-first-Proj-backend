const express = require("express");
const router = express.Router();

const { verifyToken } = require("./authorization");

//get all the products
const findAllProducts = require("../Controllers/Products/allProductsController");
router.get("/", findAllProducts);

// get one product
const findOneProduct = require("../Controllers/Products/findOneProduct");
router.get("/find/:id", findOneProduct);

// seearch product
const searchProduct = require("../Controllers/Products/searchProductController");
router.get("/search", searchProduct);

// add a product
const addProduct = require("../Controllers/Products/newProductController");
router.post("/add", verifyToken, addProduct);

// edit product
const updateProduct = require("../Controllers/Products/updateProductController");
router.patch("/edit/:id", verifyToken, updateProduct);

// delete product
const deleteProduct = require("../Controllers/Products/DeleteProductController");
router.delete("/delete/:id", verifyToken, deleteProduct);

module.exports = router;
