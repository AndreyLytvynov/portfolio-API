const Contact = require("../models/contact.model");

const getContacts = async (req, res) => {
  const { _id } = req.user;

  const data = await Contact.find({ owner: _id });

  if (!data) {
    res.status(404).json({ status: `Not found`, statusCode: 404 });
  }

  res.status(200).json({ status: `Successfully!`, statusCode: 200, data });
};

const getContById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const data = await Contact.find({ _id: contactId, owner: _id });

  if (!data || data.length === 0) {
    res.status(404).json({ status: `Not found`, statusCode: 404 });
  }

  res.status(200).json({ status: `Successfully!`, statusCode: 200, data });
};

const addContacts = async (req, res) => {
  const { name, email, phone } = req.body;

  const { id } = req.user;
  const newContact = await Contact.create({ name, email, phone, owner: id });

  res.status(201).json({
    status: `Contact added successfully!`,
    statusCode: 201,
    newContact,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const data = await Contact.findOneAndRemove({ _id: contactId, owner: _id });

  if (!data) {
    res.status(404).json({ status: `Not found`, statusCode: 404 });
  }

  res.status(201).json({
    status: `Contact with id ${contactId} deleted successfully!`,
    statusCode: 204,
    data,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const data = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );

  if (!data) {
    res.status(404).json({ status: `Not found`, statusCode: 404 });
  }

  res.status(200).json({
    status: `Contact with id ${contactId} change successfully!`,
    statusCode: 200,
    data,
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const data = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );

  if (!data) {
    res.status(404).json({ status: `Not found`, statusCode: 404 });
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
  updateFavorite,
};
