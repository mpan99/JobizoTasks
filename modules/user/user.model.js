const { date } = require('@hapi/joi');
const mongoose= require('mongoose');
const secretKey= require('../../config/env-files/development.json').secretKey;
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cart:{
        type:Array,
        default:[]
    },
    date:{
        type:Date,
        default:Date.now
    },
    city:String,
    token:String
});

userSchema.pre('save',async (next)=>{
    var user=this;
    
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(user.password,salt)
    user.password=hashed;
    next();
    
    
});

userSchema.methods.generateToken=async function(){
    try{
        var user =this;
        console.log('Inside generate token',user);
        const token=await jwt.sign({id:user._id},secretKey);
        console.log(token);
        return token;
    }
    catch(err){
        console.log(err);
    }
}

userSchema.statics.findByToken=async function(token){
    try
    {
        var user=this;
        if (token) throw Error('Token not found');
        const decodedData= await jwt.verify(token,secretKey);
        console.log('decodeToken',decodedData);
        const theUser=await User.findOne({"_id": decodedData._id});
        console.log('User from token',theUser);
        return{
            success:true,
            data:theUser
        }
    }
    catch(err){
        console.log(err);
        return {
            success: false,
            data: err
        }
    }
    
};

userSchema.methods.deleteToken=async function(token){
    var user=this;
    try
    {
        var user=this;
        const updatedUser=await user.update({$unset : {token :1}});
        return{
            success:true,
            data:updatedUser
        }
    }
    catch(err){
        console.log(err);
        return {
            success: false,
            data: err
        }
    }
};

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
const User=mongoose.model('UserC',userSchema);
module.exports= User;