const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

nom:{
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
tele:{
    type:Number,
    required:true
},
cin:{
    type:Number,
    required:true
},
age:{
    type:Number,
    required:true
},
},{timestamps:true});


module.exports = mongoose.model("User",userSchema);