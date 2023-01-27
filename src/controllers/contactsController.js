const Contact = require("../models/contact.model");

const getContacts = async (req, res) => {
  const data = await Contact.find();

  res.status(200).json({ status: `Successfully!`, statusCode: 200, data });
};

const getContById = async (req, res) => {
  const { contactId } = req.params;

  const data = await Contact.findById(contactId);

  res.status(200).json({ status: `Successfully!`, statusCode: 200, data });
};

const addContacts = async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json({
    status: `Contact added successfully!`,
    statusCode: 201,
    newContact,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const data = await Contact.findByIdAndRemove(contactId);

  res.status(201).json({
    status: `Contact with id ${contactId} deleted successfully!`,
    statusCode: 204,
    data,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.status(200).json({
    status: `Contact with id ${contactId} change successfully!`,
    statusCode: 200,
    data,
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;

  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

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
  updateFavorite,
};
