const express = require("express");

const contactsController = require("../controllers/contacts/index");

const router = express.Router();

router.use(express.json());
router.get("/", contactsController.Contacts);
router.get("/:id", contactsController.ContactById);
router.get("/", contactsController.createContact);
router.post("/", contactsController.createContact);
router.put("/:id", contactsController.updateContact);
router.patch("/:id", contactsController.updateStatusContact);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;