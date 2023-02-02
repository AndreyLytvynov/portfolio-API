const Joi = require("joi");

const signupValidation = Joi.object(
  {
    name: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(30).email().required(),
    password: Joi.string().min(3).max(30).required(),
  },
  { abortEarly: false, allowUnknown: false }
);

const loginValidation = Joi.object(
  {
    email: Joi.string().min(3).max(30).email().required(),
    password: Joi.string().min(3).max(30).required(),
  },
  { abortEarly: false, allowUnknown: false }
);

module.exports = {
  signupValidation,
  loginValidation,
};
