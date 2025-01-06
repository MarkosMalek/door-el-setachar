const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller.js");

//create a new user

router.post("/register", userController.register);

//get all users
router.get("/all", userController.all);

//get a specific user
//update a user
//delete a user

module.exports = router;
