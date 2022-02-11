const Users = require("../../Models/newUser.model");
const { loginValidation } = require("./validation");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

// find User login controller

exports.getUser = async (req, res, next) => {
  // valide data before login

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ err: error.details[0].message });

  //geting login data

  const loginData = req.body;
  const email = loginData.email;
  const password = loginData.password;

  // finding the email of the user and compering the password of that email with the password given7  mongoose

  try {
    const user = await Users.findOne({ email: email });
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      res.status(400);
      res.send("Email or password is incorrect");
    }
    if (validPass) {
      //  JWT here

      const JWT_KEY = process.env.JWT_KEY;
      const token = jwt.sign(
        { user_ID: user._id, userRole: user.role, userIsAdmin: user.isAdmin },
        JWT_KEY
      );
      res
        .send({ result: "user loged in", user: user, token: token })
        .status(200);
    }
    // now we got the token in a var called "token "after loging in
  } catch (err) {
    res.send(err.message).status(500);
  }

  next();
};

var jwt = require("jsonwebtoken");
require("dotenv").config();
exports.stay = async (req, res, next) => {
  const id = req.body.id;
  try {
    const user = await Users.findById(id);
    if (user) res.send({ user: user }).status(200);
  } catch (err) {
    res.send({ error: err.message }).status(500);
    return;
  }

  next();
};
