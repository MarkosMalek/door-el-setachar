const mongoose = require("mongoose");

const scheme =mongoose.Schema;

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

module.exports = mongoose.model('user',User_Scheme)



