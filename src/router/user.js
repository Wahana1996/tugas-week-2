const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

//CRUD Standard
// router.get("/", userController.index); //index
router.get("/page", userController.pagination); //index
// router.get("/:id", userController.show); //detail user
router.post("/", userController.store); //store
// router.put("/:id", userController.update); //update
// router.delete("/:id", userController.delete); //delete

router.get("/onetomany/:id", userController.oneToOne); //index
module.exports = router;
