const express = require("express");
const cors= require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/connect");

const dotenv= require("dotenv");
dotenv.config({path:"../.env"});


const app = express();

//commen middleware
app.use(express.json())
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(cookieParser())


//routes
app.use("/",require("./routes/main"));
app.use("/users",require("./routes/users.route"))



const PORT=process.env.PORT || 4000
connectDB()
    //if only we are connected to the database containue with lounching the server
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`we are live at ${PORT}`)
        })
    })
    .catch(error=>console.log(error))