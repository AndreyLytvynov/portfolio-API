const Joi = require("joi");

const addContactValidation = Joi.object(
  {
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(5).max(30).email().required(),
    phone: Joi.string().min(7).max(30).required(),
    favorite: Joi.boolean(),
  },
  { abortEarly: false, allowUnknown: false }
);

const updateContactValidation = Joi.object(
  {
    name: Joi.string().min(3).max(30),
    email: Joi.string().min(5).max(30).email(),
    phone: Joi.string().min(7).max(30),
    favorite: Joi.boolean(),
  },
  { abortEarly: false, allowUnknown: false }
);

const updateContactFavoriteValidation = Joi.object(
  {
    favorite: Joi.boolean(),
  },
  { abortEarly: false, allowUnknown: false }
);

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateContactFavoriteValidation,
};
