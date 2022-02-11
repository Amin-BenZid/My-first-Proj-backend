const Shop = require("../../Models/newProduct.model");
const jwt = require("jsonwebtoken");

// add product controller

module.exports = addProduct = async (req, res, next) => {
  //  new product data
  const productName = req.body.productName;
  const description = req.body.description;
  const price = req.body.price;
  const quantitie = req.body.quantitie;
  let token = req.headers.authorization;
  const user = jwt.decode(token, { comlete: true });

  // looking if the product is posted or not

  const searchProduct = await Shop.findOne({
    productName: productName,
  });

  // if the  product is not already posted then post it else nop
  if (!searchProduct)
    try {
      const newProduct = await Shop.create({
        productName: productName,
        description: description,
        price: price,
        quantitie: quantitie,
        vendorID: user.user_ID,
        //VandorID : the Vender _id take it from the loged in user from the token given after loging in
      });
      if (newProduct)
        res
          .send({
            result: "Product is added successfully",
            newProduct: newProduct,
          })
          .status(200);
    } catch (err) {
      res.send({ error: err.message }).status(500);
    }
  else {
    res.send({ result: "this product is alr posted " }).status(400);
  }

  next();
};
