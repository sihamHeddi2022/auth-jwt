const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    full_name:String
})

exports.User = mongoose.model("user",userSchema)