const Users = require("../../Models/newUser.model");

module.exports = allUSers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    res.send({ allUsers: allUsers }).status(200);
  } catch (err) {
    res.send({ error: err }).status(500);
  }
  next();
};
