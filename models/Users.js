const mongoose = require("mongoose");
const {Schema} = mongoose;

const usersSchema = new Schema({
    name : {
        type: String,
        required:true
    },

    username:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }

})

const users = mongoose.model("users",usersSchema);
users.createIndexes();
module.exports = users;