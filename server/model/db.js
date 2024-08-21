const mongoose=require('mongoose');

const Schema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    contact:{
        type:String
    },
    address:{
        type:String
    }
})
const db=mongoose.model('payment',Schema)
module.exports =db