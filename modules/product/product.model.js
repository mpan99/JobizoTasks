const mongoose= require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    brandName:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model('User',productSchema);