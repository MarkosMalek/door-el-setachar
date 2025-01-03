const User = require("../models/user.models");

// JWT access and refresh tokens
const genrateAccessAndRefreshTokens = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    console.log("something went wrong with creating access and refresh tokens");
  }
};

module.exports = genrateAccessAndRefreshTokens;
