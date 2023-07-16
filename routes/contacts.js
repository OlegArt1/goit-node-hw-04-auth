const express = require("express");

const getContactsController = require("../controllers/contacts/getContacts");
const getContactByIdController = require("../controllers/contacts/getContactById");
const getFilterFavoriteContactController = require("../controllers/contacts/getFilterContact");
const postCreateContactController = require("../controllers/contacts/createContact");
const putUpdateContactController = require("../controllers/contacts/updateContact");
const patchUpdateStatusContactController = require("../controllers/contacts/updateStatusContact");
const deleteContactController = require("../controllers/contacts/deleteContact");

const router = express.Router();

router.use(express.json());
router.get("/", getContactsController.getContacts);
router.get("/:id", getContactByIdController.getContactById);
router.get("/", getFilterFavoriteContactController.getFilterContact);
router.post("/", postCreateContactController.createContact);
router.put("/:id", putUpdateContactController.updateContact);
router.patch("/:id", patchUpdateStatusContactController.updateStatusContact);
router.delete("/:id", deleteContactController.deleteContact);

module.exports = router;