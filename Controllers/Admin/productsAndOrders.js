const Products = require("../../Models/newProduct.model");
const Orders = require("../../Models/orders.model");

module.exports = productsAndOrders = async (req, res, next) => {
  try {
    const numberOfProducts = await Products.count();
    const numberOfOrders = await Orders.count();

    res
      .send({
        numberOfProducts: numberOfProducts,
        numberOfOrders: numberOfOrders,
      })
      .status(200);
  } catch (err) {
    res.send({ error: err }).status(500);
  }

  next();
};
