const express = require("express");
const auth = require("../middleware/auth");

const postRegisterAuthController = require("../controllers/authRegister");
const postLoginAuthController = require("../controllers/authLogin");
const postLogoutAuthController = require("../controllers/authLogout");
const getCurrentAuthController = require("../controllers/authCurrent");
const patchUpdateStatusAuthController = require("../controllers/authUpdateStatus");

const router = express.Router();

router.use(express.json());
router.post("/register", postRegisterAuthController.registered);
router.post("/login", postLoginAuthController.login);
router.post("/logout", auth, postLogoutAuthController.logout);
router.get("/current", auth, getCurrentAuthController.current);
router.patch("/", patchUpdateStatusAuthController.updateStatusAuth);

module.exports = router;