const Joi = require("joi");

const postValidation = Joi.object({
  name: Joi.string().min(2).max(70).required(),
  company: Joi.string().min(2).max(70),
  text: Joi.string().required(),
  date: Joi.string().required(),
});

module.exports = {
  postValidation,
};
