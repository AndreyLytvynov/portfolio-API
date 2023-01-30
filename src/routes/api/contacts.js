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
const isValidId = require("../../middlewares/valitationIdMiddleware");

router
  .get("/", getContacts)
  .get("/:contactId", isValidId, tryCatch(getContById))
  .post("/", validator.body(addContactValidation), tryCatch(addContacts))
  .delete("/:contactId", isValidId, tryCatch(deleteContact))
  .put(
    "/:contactId",
    isValidId,
    validator.body(updateContactValidation),
    tryCatch(updateContact)
  )
  .patch(
    "/:contactId/favorite",
    isValidId,
    validator.body(updateContactFavoriteValidation),
    tryCatch(updateContact)
  );

module.exports = router;
