const express = require("express");
const mangoose = require("mongoose");
const dotenv= require("dotenv");

dotenv.config();
const app = express();
const PORT=process.env.PORT || 3000

//connect to the database
mangoose.connect(process.env.MONGODB_URL);


app.use("/",require("./routes/main"))


app.listen(PORT,()=>{
    console.log(`we are live at ${PORT}`)
})