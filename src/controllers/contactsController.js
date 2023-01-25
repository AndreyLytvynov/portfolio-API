const {
  addContact,
  getContactById,
  removeContact,
  updateCont,
  listContacts,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  const data = await listContacts();
  res.status(200).json({ status: `Successfully!`, statusCode: 200, data });
};

const getContById = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    return res.status(404).json({
      status: `Failure, no contact with id ${contactId} found!`,
      statusCode: 404,
    });
  }
  res.status(200).json({ status: `Successfully!`, statusCode: 200, data });
};

const addContacts = async (req, res) => {
  const contact = req.body;
  const data = await addContact(contact);
  res.status(201).json({
    status: `Contact added successfully!`,
    statusCode: 201,
    data,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);

  if (!data) {
    return res.status(404).json({
      status: `Failure, no contact with id ${contactId} found!`,
      statusCode: 404,
    });
  }

  res.status(201).json({
    status: `Contact with id ${contactId} deleted successfully!`,
    statusCode: 204,
    data,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = req.body;

  const data = await updateCont(contactId, contact);

  if (!data) {
    return res.status(404).json({
      status: `Failure, no contact with id ${contactId} found!`,
      statusCode: 404,
    });
  }
  res.status(200).json({
    status: `Contact with id ${contactId} change successfully!`,
    statusCode: 200,
    data,
  });
};

module.exports = {
  getContacts,
  getContById,
  addContacts,
  deleteContact,
  updateContact,
};
