const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURI = process.env.MONGO_URI;
const mongoURI = "mongodb+srv://shashwatrauthan:Qwerty123456@cloud-notes.simea.mongodb.net/cloudNotes?retryWrites=true&w=majority";


const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo.");
    })
}

module.exports = connectToMongo;
