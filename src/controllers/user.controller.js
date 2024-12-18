const asyncHandler = require("express-async-handler");
//const user=require("../controllers/user.models.js")



//get all users

const userController = asyncHandler(async (req,res,next)=>{
    res.send("hello we are at users/all");
});

module.exports= {userController}