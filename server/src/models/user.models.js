const {mongoose ,Schema} = require("mongoose");
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");

const User_Scheme = new Schema({
    name:{
        "type":String,
        "required":true
    },
    email:{
        "type":String,
        "required":true,
        "unique":true,
        "lowercase":true
    },
    password:{
        "type":String,
        "required":true
    },
    refreshtoken:{
        "type":String
    }
});

// Encrypt password before saving into database
User_Scheme.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
   });

//check if password correct
User_Scheme.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

//create JWT access Token 
User_Scheme.methods.createAccessToken = function(){
    //short lived Access Token
    return jwt.sign({
        _id:this._id
    },process.env.ACCESS_TOKEN_SECRET
    ,{expiresIn:'5s'})
}

//create JWT Refresh Token
User_Scheme.methods.createRefreshToken = function(){
    //Long lived Refresh Token
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_SECRET
    ,{expiresIn:'10d'})
}


const User =  mongoose.model('User',User_Scheme)
module.exports =User;


