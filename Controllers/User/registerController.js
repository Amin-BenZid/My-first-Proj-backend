const Users = require("../../Models/newUser.model");
const bcrypt = require("bcrypt");

// add user controller

exports.addUser = async (req, res, next) => {
  // Hash Password

  const salt = await bcrypt.genSalt(10);
  hashPassword = await bcrypt.hash(req.body.password, salt);

  // newUser Data

  const name = req.body.name;
  const password = hashPassword;
  const role = req.body.role;
  const email = req.body.email;

  // looking if the email is used or not

  try {
    const newUser = await Users.create({
      name: name,
      password: password,
      role: role,
      email: email,
    });
    if (newUser) {
      res
        .send({ result: "user is added successfully", newUser: newUser })
        .status(200);
    }
  } catch (err) {
    res.status(400);
    res.send({ err: err.message });
  }

  next();
};
