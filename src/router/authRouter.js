const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/register", authController.register); //register
router.post("/login", authController.login); //login
router.post("/refresh-token", authController.refreshToken); //refresh token

module.exports = router;
