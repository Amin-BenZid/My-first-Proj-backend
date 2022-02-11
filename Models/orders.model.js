const mongoose = require("mongoose");

let schemaOrders = mongoose.Schema({
  productId: {
    type: String,
  },
  priceOfOne: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  client: {
    type: String,
  },
  quantitie: {
    type: Number,
    default: 1,
    min: 1,
  },
  date: {
    type: Date,
  },
});

const Orders = mongoose.model("Order", schemaOrders);

module.exports = Orders;
