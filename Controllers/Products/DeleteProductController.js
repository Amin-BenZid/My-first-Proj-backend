const Products = require("../../Models/newProduct.model");

var jwt = require("jsonwebtoken");

module.exports = deleteProduct = async (req, res, next) => {
  // product id  that we wil delete
  const productId = req.params.id;

  // taking the old data from the login token
  var token = req.headers.authorization;
  const user = jwt.decode(token);
  const userID = user.user_ID;
  const admin = user.userIsAdmin;

  // finding the product that we will be deleting

  const editProduct = await Products.findById(productId);
  if (!editProduct)
  if (!editProduct) return res.status(404).send({ error: "Product not found" });

  // looking if the current user is the owner of that product or not by vendorID (found in the product)
  const vendorID = editProduct.vendorID;

  // if the current user is the owner he can delete the product or if he is an admin
  if (vendorID == userID || admin === true)
    try {
      const editProduct = await Products.findByIdAndDelete(productId);
      if (editProduct) res.status(200).send({ result: editProduct });

      next();
    } catch (err) {
      res.send({ result: err }).status(500);
    }
  // if the current user is not the owner he can't delete
  else return res.send({ error: "access denied !!!" });
};
