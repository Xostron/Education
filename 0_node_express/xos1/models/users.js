const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{type:String, unique:true},
    password:String
})

const User = mongoose.model('Users',userSchema)

module.exports=User