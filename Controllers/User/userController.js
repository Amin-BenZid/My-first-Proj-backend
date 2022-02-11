const Users = require("../../Models/newUser.model");
exports.user = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await Users.findOne({ _id: userId });
    if (user) {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
  next();
};
