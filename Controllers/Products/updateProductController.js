const Products = require("../../Models/newProduct.model");

var jwt = require("jsonwebtoken");

module.exports = updateProduct = async (req, res, next) => {
  // new data that will be updated
  const productId = req.params.id;
  const newName = req.body.productName;
  const newDes = req.body.description;
  const newPrice = req.body.price;

  var token = req.headers.authorization;
  const user = jwt.decode(token);
  const userID = user.user_ID;

  try {
    const editProduct = await Products.findById(productId);
    const vendorID = editProduct.vendorID;
    const quantitie = editProduct.quantitie;
    const newQuantitie = quantitie + req.body.quantitie;
    if (vendorID == userID)
      try {
        const editProduct = await Products.findByIdAndUpdate(productId, {
          productName: newName,
          description: newDes,
          price: newPrice,
          quantitie: newQuantitie,
        });
        if (editProduct) {
          res.status(200).send({ result: editProduct });
          next();
        }
      } catch (err) {
        res.send({ result: err }).status(500);
      }
  } catch {
    return res.send({ error: "access denied !!!" });
  }
};
