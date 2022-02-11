const Users = require("../../Models/newUser.model");

module.exports = giveUserAdmin = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const setUserAdmin = await Users.findByIdAndUpdate(userId, {
      isAdmin: true,
    });
    if (editProduct) res.status(200).send({ result: setUserAdmin });
    next();
  } catch (err) {
    return res.send({ result: err }).status(500);
  }
};
module.exports = remUserAdmin = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const remUserAdmin = await Users.findByIdAndUpdate(userId, {
      isAdmin: false,
    });
    if (editProduct) res.status(200).send({ result: remUserAdmin });
    next();
  } catch (err) {
    return res.send({ result: err }).status(500);
  }
};
module.exports = banUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const banUser = await Users.findByIdAndDelete(userId);
    if (editProduct) res.status(200).send({ result: banUser });
    next();
  } catch (err) {
    return res.send({ result: err }).status(500);
  }
};
