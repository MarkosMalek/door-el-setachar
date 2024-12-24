const asyncHandler = require("express-async-handler");
const user=require("../models/user.models.js")
const bcrypt =require("bcrypt");


//register a new user
const registerUser = asyncHandler(async (req,res)=>{
    const {name ,email,password}=req.body

    //some validation
    if(!name || !email || !password){
        res.send("please enter all fields");
    }
    const existingUser = await user.findOne({$or:[{name:name},{email:email}]})
        if(existingUser==null){
            const newUser = await user.create({name,email,password});
            res.send(newUser)
        }else  res.send("user already exist")
    
    // JWT access and refresh tokens

    
    
})

//log in
const logIn = asyncHandler(async (req,res)=>{
        const {name,email,password}=req.body
        if(!name || !email || !password){
            res.send("please enter all fields");
        }
        const existingUser = await user.findOne({name:name,email:email})
        if(existingUser==null){
            res.send("no user with this name or email,please register as a new user first")
        }else{
            const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
            if(isPasswordCorrect){
                res.send(`password is correct wellcome : ${name}`)
            }else res.send("password is incorrect")
        }
        


})
//log out


//get all users

const userController = asyncHandler(async (req,res)=>{
    const allUsers = await user.find({})
    res.send(allUsers)

});


//get a single user


//delete a user

//update a user


module.exports= {userController,registerUser,logIn}