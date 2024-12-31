const mongoose =require("mongoose");
const dotenv=require("dotenv");

dotenv.config({path:"../../../.env"})


const connectDB = async () => {
    try{
        //connect to the database
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`mogoose is connected at ${process.env.MONGODB_URL}`)
    }catch(error){
        console.log("mongoose did not connect",error)
    }
}

module.exports={connectDB}