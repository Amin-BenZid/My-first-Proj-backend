const express = require("express");
const router = express.Router();
const { verifyUser } = require("./authorization");

const GetUserController = require("../Controllers/User/loginController");

// Login router
router.post("/", GetUserController.getUser);
// stay logedin
router.post("/stay", verifyUser, GetUserController.stay);

const user = require("../Controllers/User/userController");

router.get("/:id", user.user);

module.exports = router;
