const mongoose= require('mongoose');

const userTokensSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
});

module.exports=mongoose.model('userToken',userTokensSchema);