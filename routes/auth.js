const express = require("express");
const auth = require("../middleware/auth");

const authControllers = require("../controllers/auth/index");

const router = express.Router();

router.use(express.json());
router.post("/register", authControllers.authRegister);
router.post("/login", authControllers.authLogin);
router.post("/logout", auth, authControllers.authLogout);
router.get("/current", auth, authControllers.authCurrent);
router.patch("/", authControllers.authUpdateStatus);

module.exports = router;