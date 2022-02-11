const Products = require("../../Models/newProduct.model");

module.exports = allProducts = async (req, res, next) => {
  try {
    const findAllProducts = await Products.find();
    if (findAllProducts) res.send({ result: findAllProducts }).status(200);
    next();
  } catch (err) {
    res.send({ result: err }).status(500);
  }
};
