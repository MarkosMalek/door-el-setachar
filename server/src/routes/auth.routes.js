const express = require("express");
const router = express.Router();
const { logInController } = require("../controllers/auth.controller");

// log-in
// http://localhost:5000/auth/login

router.post("/login", logInController);

module.exports = router;
