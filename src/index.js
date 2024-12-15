const express = require("express");
const cors= require("cors");
const dotenv= require("dotenv");
dotenv.config({path:"../.env"});
const { connectDB } = require("./db/connect");


const app = express();

//commen middleware
app.use("/",require("./routes/main"));
app.use(express.json({limit:"16kb"}))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));


const PORT=process.env.PORT || 4000
connectDB()
    //if only we are connected to the database containue with lounching the server
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`we are live at ${PORT}`)
        })
    })
    .catch(error=>console.log(error))