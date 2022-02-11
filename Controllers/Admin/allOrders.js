const Orders = require("../../Models/orders.model");

module.exports = allOrders = async (req, res, next) => {
  try {
    const allOroders = await Orders.find();
    res.send({ allOroders: allOroders }).status(200);
  } catch (err) {
    res.send({ error: err }).status(500);
  }
  next();
};
