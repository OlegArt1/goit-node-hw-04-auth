const express = require("express");
const auth = require("../middleware/auth");

const postRegisterAuthController = require("../controllers/registerAuth");
const postLoginAuthController = require("../controllers/loginAuth");
const postLogoutAuthController = require("../controllers/logoutAuth");
const getCurrentAuthController = require("../controllers/currentAuth");
const patchAuthController = require("../controllers/updateStatusAuth");
const getAuthController = require("../controllers/filterAuth");

const router = express.Router();

router.use(express.json());

router.post("/register", postRegisterAuthController.registered);
router.post("/login", postLoginAuthController.login);
router.post("/logout", auth, postLogoutAuthController.logout);
router.get("/current", auth, getCurrentAuthController.current);
router.patch("/", patchAuthController.updateStatusAuth);
router.get("/", getAuthController.getFilterAuth);

module.exports = router;