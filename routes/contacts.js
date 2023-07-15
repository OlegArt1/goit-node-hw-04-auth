const express = require("express");

const getContactsController = require("../controllers/getContacts");
const getContactByIdController = require("../controllers/getContactById");
const postCreateContactController = require("../controllers/createContact");
const putUpdateContactController = require("../controllers/updateContact");
const patchUpdateStatusContactController = require("../controllers/updateStatusContact");
const deleteContactController = require("../controllers/deleteContact");

const router = express.Router();

router.use(express.json());

router.get("/", getContactsController.getContacts);
router.get("/:id", getContactByIdController.getContactById);
router.post("/", postCreateContactController.createContact);
router.put("/:id", putUpdateContactController.updateContact);
router.patch("/:id", patchUpdateStatusContactController.updateStatusContact);
router.delete("/:id", deleteContactController.deleteContact);

module.exports = router;