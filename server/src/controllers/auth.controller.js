const User = require("../models/user.models");
const asyncHandler = require("express-async-handler");

//log in
const logInController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.send("please enter all fields");
  }
  const existingUser = await User.findOne({ name, email });
  if (existingUser == null) {
    res.send(
      "no user with this name or email,if you are new please register as a new user first"
    );
  } else {
    const isCorrect = await existingUser.isPasswordCorrect(password);
    if (isCorrect) {
      res.send(`password is correct wellcome : ${name}`);
    } else res.send("password is incorrect");
  }
});

//logout

module.exports = { logInController };
