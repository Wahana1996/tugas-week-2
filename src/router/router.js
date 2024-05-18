const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const profileRouter = require("./profileRouter");
const authRouter = require("./authRouter");

router.use("/users", userRouter);
router.use("/profiles", profileRouter);
router.use("/auth", authRouter);

module.exports = router;
