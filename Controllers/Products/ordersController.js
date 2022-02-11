const Products = require("../../Models/newProduct.model");
const Orders = require("../../Models/orders.model");
const jwt = require("jsonwebtoken");

module.exports = order = async (req, res, next) => {
  //  product id
  const productId = req.params.id;

  // finding the product that the user will order
  const productData = await Products.findById(productId);
  if (productData) {
    // order data
    const priceOfOne = productData.price;
    const quantitie = req.body.quantitie;
    const totalPrice = priceOfOne * quantitie;
    // finding the user that will buy that product from the token
    var token = req.headers.authorization;
    const user = jwt.decode(token);
    const userID = user.user_ID;
    const client = userID;
    // looking if he can get that much of that product
    const quantitieValid = productData.quantitie;
    if (quantitie <= quantitieValid)
      // creating the order
      try {
        const newOrder = await Orders.create({
          productId: productId,
          client: client,
          priceOfOne: priceOfOne,
          totalPrice: totalPrice,
          quantitie: quantitie,
          date: Date.now(),
        });
        // updating the quantitie
        if (newOrder)
          await Products.findByIdAndUpdate(productId, {
            quantitie: quantitieValid - quantitie,
          });
        if (newOrder) res.send({ neworder: newOrder }).status(200);
      } catch (err) {
        res.send({ error: err.message }).status(500);
      }
    else if (quantitieValid == 0)
      res.send({ error: `This product is expired` }).status(400);
    else res.send({ error: `We only have ${quantitieValid} ` }).status(400);
  } else res.send({ error: "product not found" }).status(400);
  next();
};
