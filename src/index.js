const express = require("express");
const dotenv= require("dotenv");
const { connectDB } = require("./db/connect");
dotenv.config({path:"../.env"});


const app = express();
app.use("/",require("./routes/main"));




const PORT=process.env.PORT || 3000


connectDB()
    //if only we are connected to the database containue with lounching the server
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`we are live at ${PORT}`)
        })
    })
    .catch(error=>console.log(error))