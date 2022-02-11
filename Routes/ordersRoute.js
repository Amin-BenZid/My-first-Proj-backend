const express = require("express");
const router = express.Router();
const { verifyToken } = require("./authorization");

const order = require("../Controllers/Products/ordersController");

//get all the orders
router.post("/:id", verifyToken, order);

module.exports = router;
