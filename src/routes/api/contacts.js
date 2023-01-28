const express = require("express");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  addContactValidation,
  updateContactValidation,
  updateContactFavoriteValidation,
} = require("../../middlewares/validationMiddleware");
const {
  getContacts,
  getContById,
  addContacts,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsController");

const tryCatch = require("../../utils/try-catch.util");

router
  .get("/", getContacts)
  .get("/:contactId", tryCatch(getContById))
  .post("/", validator.body(addContactValidation), addContacts)
  .delete("/:contactId", deleteContact)
  .put(
    "/:contactId",
    validator.body(updateContactValidation),
    tryCatch(updateContact)
  )
  .patch(
    "/:contactId/favorite",
    validator.body(updateContactFavoriteValidation),
    tryCatch(updateContact)
  );

module.exports = router;
