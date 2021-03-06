const mongoose = require("mongoose");
const {Schema, model} = require("mongoose")

const {ObjectId} = mongoose.Schema.Types
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // resetToken:String,
    // expireToken:Date,
    pic:{
     type:String,
     default:"http://res.cloudinary.com/dedenco/image/upload/v1599511161/qxexqvsfekvmrupbfdqh.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    followings:[{type:ObjectId,ref:"User"}]
})

const User = model("User", userSchema);

module.exports = User;