const express = require("express");
const router = express.Router();
const {
  logInController,
  logOutController,
  refreshController,
} = require("../controllers/auth.controller");

router.post("/login", logInController);
router.get("/refresh", refreshController);
router.post("/logout", logOutController);

module.exports = router;
