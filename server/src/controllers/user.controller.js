const asyncHandler = require("express-async-handler");
const User = require("../models/user.models.js");
const genrateAccessAndRefreshTokens = require("../utils/generateTokens.js");

//Create a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //some validation
  if (!name || !email || !password) {
    res.send("please enter all fields");
  }
  const existingUser = await User.findOne({
    $or: [{ name: name }, { email: email }],
  });
  if (existingUser == null) {
    //create a new user in the database
    const newUser = await User.create({ name, email, password });

    //create access and refresh tokens
    const { accessToken, refreshToken } = await genrateAccessAndRefreshTokens(
      newUser._id
    );
    //save the new generated refresh token to the database
    newUser.refreshtoken = refreshToken;
    await newUser.save();
    //save the same refersh token to the cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.send(accessToken);
  } else res.send("user with same email or name already exist");
});

//get all users
const userController = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.send(allUsers);
});

//get a specific user
//update a user
//delete a user

module.exports = {
  userController,
  registerUser,
};
