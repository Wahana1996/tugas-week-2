const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const profileRouter = require("./profileRouter");

router.use("/users", userRouter);
router.use("/profiles", profileRouter);

module.exports = router;
