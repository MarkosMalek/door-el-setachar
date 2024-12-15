const {scheme} = require("mongoose");

const User_Scheme = new scheme({
    Name:{
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

const user =  mongoose.model('User',User_Scheme)
module.exports =user;


