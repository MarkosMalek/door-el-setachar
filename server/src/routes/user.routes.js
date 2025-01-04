const express = require("express");
const router = express.Router();

const {
  userController,
  registerUser,
} = require("../controllers/user.controller.js");

//create a new user

router.post("/register", registerUser);

//get all users
router.get("/all", userController);

//get a specific user
//update a user
//delete a user

module.exports = router;
