const express = require("express");
const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddleware");

const {
  getContacts,
  getContById,
  addContacts,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsController");

router.get("/", getContacts);

router.get("/:contactId", getContById);

router.post("/", addContactValidation, addContacts);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContactValidation, updateContact);

module.exports = router;
