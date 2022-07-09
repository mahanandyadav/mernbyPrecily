const mongoose=require('mongoose');

//defining model
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        // required: true,
        trim: true
    },
    email:{
        type:String
    }
})

const User=mongoose.model('User',userSchema)
module.exports=User;