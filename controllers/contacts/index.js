const Contacts = require("./getContacts");
const ContactById = require("./getContactById");
const createContact = require("./createContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");
const deleteContact = require("./deleteContact");

module.exports =
{
    Contacts,
    ContactById,
    createContact,
    updateContact,
    updateStatusContact,
    deleteContact
};