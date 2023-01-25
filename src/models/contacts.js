// const fs = require('fs/promises')
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./src/models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((cont) => cont.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const addContact = async (contact) => {
  const { name, email, phone } = contact;
  const contacts = await listContacts();
  contacts.push({ id: Date.now().toString(), name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const deletedContacts = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return deletedContacts[0];
};

const updateCont = async (contactId, contact) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((cont) => cont.id === contactId);
  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...contact };

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateCont,
};
