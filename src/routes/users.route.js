const express= require("express");
const router= express.Router();

const {userController}= require("../controllers/user.controller");


//home page
router.get("/All",userController);

module.exports=router;
