const express = require("express");

const router= express.Router();

//home page

router.get("",(req,res)=>{
    res.send("Home Page")
});


module.exports = router;