const Joi = require("@hapi/joi");

// Login Validation

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.loginValidation = loginValidation;
