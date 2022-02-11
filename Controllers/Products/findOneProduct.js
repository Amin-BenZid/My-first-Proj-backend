const Products = require("../../Models/newProduct.model");

module.exports = getOneProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findOneProduct = await Products.findOne({ _id: id });
    if (findOneProduct) res.send({ result: findOneProduct }).status(200);
    next();
  } catch (err) {
    res.send({ result: err }).status(500);
  }
};
