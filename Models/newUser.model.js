const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// let validator = require("validator");

let schemaNewUser = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minlength: [3, "Too short min is 3"],
    maxlength: [25, "Too long max is 25"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: [true, "This email is already used"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
    minlength: [8, "mim length is 8 chars"],
  },
  role: {
    type: String,
    required: [true, "This is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
schemaNewUser.plugin(uniqueValidator);

var Users = mongoose.model("User", schemaNewUser);

module.exports = Users;
