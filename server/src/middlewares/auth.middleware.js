const varifyToken = require("../utils/varifyToken");
const asyncHandler = require("express-async-handler");

//note: for any protected route adding this middleware insure that the user is logged in and has a valid access token if not handle in the fronend by visiting the refresh route
const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });
  const decodedAccessToken = await varifyToken(
    authHeader.split(" ")[1],
    process.env.ACCESS_TOKEN_SECRET
  );
  if (!decodedAccessToken)
    return res.status(401).json({ message: "Unauthorized" });
  req.userID = decodedAccessToken._id;
  next();
});

module.exports = authMiddleware;
