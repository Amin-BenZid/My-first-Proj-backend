const express = require("express");
const router = express.Router();
const { verifyAdminToken } = require("./authorization");

// delete products
const deleteProduct = require("../Controllers/Products/DeleteProductController");
router.delete("/delete/:id", verifyAdminToken, deleteProduct);

// number of products and orders in this web site
const productsAndOrders = require("../Controllers/Admin/productsAndOrders");
router.get("/", verifyAdminToken, productsAndOrders);

// //TODO SUM OF ALL PRODUCTS SOLD
// router.get("/products/sold", verifyAdminToken);
// //TODO SUM OF ALL PRODUCTS SOLD

// //TODO SUM OF THE PRODUCT WORTH
// router.get("/products/worth", verifyAdminToken);
// //TODO SUM OF THE PRODUCT WORTH

//  get all the orders
const allOrders = require("../Controllers/Admin/allOrders");
router.get("/orders", verifyAdminToken, allOrders);

//  get all the users
const allUSers = require("../Controllers/Admin/allUsers");
router.get("/users", verifyAdminToken, allUSers);

// give a user the admin role
const giveUserAdmin = require("../Controllers/Admin/giveUserAdmin");
router.patch("/user/role/:id", verifyAdminToken, giveUserAdmin);

// rem user admin
const remUserAdmin = require("../Controllers/Admin/giveUserAdmin");
router.patch("/user/remrole/:id", verifyAdminToken, remUserAdmin);

// Ban User
const banUser = require("../Controllers/Admin/giveUserAdmin");
router.patch("/user/ban/:id", verifyAdminToken, banUser);
module.exports = router;
