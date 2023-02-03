const { isValidObjectId } = require("mongoose");
const ValidationError = require("../helpers/errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    next(new ValidationError(`Not found`));
  }
  next();
};

module.exports = isValidId;
