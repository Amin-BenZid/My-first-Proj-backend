const express = require("express");
const router = express.Router();

const AddUserController = require("../Controllers/User/registerController");

// Register post router
router.post("/", AddUserController.addUser);

module.exports = router;
