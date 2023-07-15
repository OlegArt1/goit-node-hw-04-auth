const express = require("express");
const auth = require("../middleware/auth");

const authRoutes = require("./auth");
const contactRoutes = require("./contacts");

const router = express.Router();

router.use("/users", authRoutes);
router.use("/contacts", auth, contactRoutes);

module.exports = router;