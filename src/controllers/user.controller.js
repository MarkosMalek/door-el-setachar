const asyncHandler = require("express-async-handler");
const User=require("../models/user.models.js")
const bcrypt =require("bcrypt");


// JWT access and refresh tokens
const genrateAccessAndRefreshTokens =async(userID)=>{
    try {
        const user = await User.findById(userID);
        const accessToken = user.createAccessToken()
        const refreshToken = user.createRefreshToken()
        return {accessToken,refreshToken}
    } catch (error) {
        console.log(error);
        console.log("something went wrong with creating access and refresh tokens")
    }
}

//register a new user
const registerUser = asyncHandler(async (req,res)=>{
    const {name ,email,password}=req.body

    //some validation
    if(!name || !email || !password){
        res.send("please enter all fields");
    }
    const existingUser = await User.findOne({$or:[{name:name},{email:email}]})
        if(existingUser==null){
            //create a new user in the database
            const newUser = await User.create({name,email,password});
            
            //Get createdUser from DataBase
            const createdUser=await User.findOne({email:email})
            //create access and refresh tokens
            const {accessToken,refreshToken} = await genrateAccessAndRefreshTokens(createdUser._id)
            
            //save the new generated refresh token to the database aslo toggle the islogged in to true
            createdUser.refreshtoken=refreshToken;
            createdUser.isLoggedIn =true;
            await createdUser.save();

            //save the same refersh token to the cookies
            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:'strict'
            })

            res.send(accessToken)
        }else  res.send("user with same email or name already exist")    
})

//log in
const logIn = asyncHandler(async (req,res)=>{
        const {name,email,password}=req.body
        if(!name || !email || !password){
            res.send("please enter all fields");
        }
        const existingUser = await User.findOne({name:name,email:email})
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
    const allUsers = await User.find({})
    res.send(allUsers)

});


//get a single user


//delete a user

//update a user


module.exports= {userController,registerUser,logIn}