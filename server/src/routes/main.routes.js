const express = require("express");

const router = express.Router();

//home page

router.get("", (req, res) => {
  res.send("Home Page");
});

router.get("/about", (req, res) => {
  res.send("about");
});

module.exports = router;
