const User = require("../models/user.models");
const asyncHandler = require("express-async-handler");
const genrateAccessAndRefreshTokens = require("../utils/generateTokens");
const varifyToken = require("../utils/varifyToken");

//note: when access token is invalid hit the refresh route but when refresh token is invalid you have to signin again

//@DESC Login
//Route POST /auth/login
//Access Public
const logInController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "all fields are required!" });
  }
  const existingUser = await User.findOne({ name, email });
  if (existingUser == null) {
    return res.status(401).json({
      message:
        "no user with this name or email,if you are new please register as a new user first",
    });
  }
  const isCorrect = await existingUser.isPasswordCorrect(password);
  if (isCorrect) {
    //create access and refresh tokens
    const { accessToken, refreshToken } = await genrateAccessAndRefreshTokens(
      existingUser._id
    );
    //save the new generated refresh token to the database
    existingUser.refreshtoken = refreshToken;
    await existingUser.save();
    //save the same refersh token to the cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, //access only by http request
      secure: true,
      sameSite: "strict",
    });

    res.send(accessToken);
  } else
    res.status(401).json({ message: "Unauthorized : password is incorrect" });
});

//@DESC Logout
//Route POST /auth/logout
//Access Public - remove token from cookies
const logOutController = asyncHandler((req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) return res.status(204).send("no content");
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.json({ message: "cookie cleared" });
});

//@DESC refresh
//Route GET /auth/refresh
//Access Public -create a new access token when access token expired
const refreshController = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken)
    return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.refreshToken;
  const decodedToken = await varifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  ); //return decoded or null
  if (!decodedToken) return res.status(401).json({ message: "Unauthorized" });
  const user = await User.findById(decodedToken._id);
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  const { accessToken } = await genrateAccessAndRefreshTokens(user._id);
  res.json({ accessToken });
});

module.exports = { logInController, logOutController, refreshController };
