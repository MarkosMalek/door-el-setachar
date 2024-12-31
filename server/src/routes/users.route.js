const express= require("express");
const router= express.Router();

const { userController,
        registerUser,
        logIn
} = require("../controllers/user.controller");


//home page
router.get("/all",userController);

//register a new user 

router.post("/register",registerUser);

//log-in
router.post("/login",logIn)

module.exports=router;
