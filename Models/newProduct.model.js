const mongoose = require("mongoose");

let schemaNewShop = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantitie: {
    type: Number,
    min: 1,
    required: true,
  },
  vendorID: {
    // from the token
    type: String,
    required: true,
  },
});

var Shops = mongoose.model("Shop", schemaNewShop);

module.exports = Shops;
