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
        "required":true
    },
    password:{
        "type":String,
        "required":true
    }
});

// Encrypt password before saving into database
User_Scheme.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
   });

// create a methode that check if password correct
User_Scheme.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

//create JWT access Token 
User_Scheme.methods.createAccessToken = function(){
    //short lived Access Token
    jwt.sign({
        _id:this._id
    },process.env.ACCESS_TOKEN_SECRET
    ,{expiresIn:'1d'})
}

//create JWT access Token
User_Scheme.methods.createRefreshToken = function(){
    //Long lived Refresh Token
    jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_SECRET
    ,{expiresIn:'10d'})
}


const user =  mongoose.model('User',User_Scheme)
module.exports =user;


