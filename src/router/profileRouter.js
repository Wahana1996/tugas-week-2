const express = require("express");
const profileController = require("../controller/profileController");
const router = express.Router();

//CRUD Standard
// router.get("/", userController.index); //index
// router.get("/page", userController.pagination); //index
// router.get("/:id", userController.show); //detail user
router.post("/", profileController.store); //store
// router.put("/:id", userController.update); //update
// router.delete("/:id", userController.delete); //delete

module.exports = router;
