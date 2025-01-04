const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const varifyToken = asyncHandler((token, secret) => {
  const decodedToken = jwt.verify(token, secret);
  return decodedToken ? decodedToken : null;
});

module.exports = varifyToken;
