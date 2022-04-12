const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("this location"+mongoURI);
        console.log("Connected to Mongo.");
    })
}

module.exports = connectToMongo;
