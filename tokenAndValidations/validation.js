const joi= require('@hapi/joi');
const { json } = require('body-parser');
const express= require('express');
const User= require('../modules/user/user.model');
const UserToken= require('../models/userTokens');
const app=express();
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken')
app.use(json());

//Validation

const registerValidator=async (req,res,next)=>{
    const existingUser=await User.findOne({email:req.body.email});
    console.log(existingUser);
    const {error}=joi.validate(req.body,{
        name: joi.string().min(4).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
        city: joi.string().min(3).required(),
        
    });
    if(error){
        res.send(error.details[0].message);
    }
    else if(existingUser) {
        res.status(400).send('Existing User!!');
    }
    else  next();
}

// -------------------------------------------------------------------------------------------------------
const loginValidator=async (req,res,next)=>{
    const existingUser=await User.findOne({email:req.body.email});
    //If user alreay logged in
    const tokenObject=await UserToken.find({_id:existingUser._id})
    if(tokenObject) next();

    // Later Validations
    const {error}=joi.validate(req.body,{
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    })
    if(error){
        res.send(error.details[0].message);
    }
    
    if(!existingUser) res.send('Invalid Email');
    let validPass =  existingUser && await bcrypt.compare(req.body.password,existingUser.password);
    if(!validPass){
        res.send('Invalid Password');
    }

    


    // Token created
    const token= jwt.sign({_id:existingUser._id},'fdjkljldfjljfkdjs');
    // UserId and token saved inside userToken collection
    console.log(await UserToken.create({
        userId:existingUser._id,
        token:token
    }));
    // Setting token in header
    res.header('auth-token',token);
    console.log(token);
    next();
}

const logout=(req,res,next)=>{
    console.log('authToken',req.header('auth-token'));
    // UserToken.remove(req)
    next();
}



module.exports={registerValidator,loginValidator,logout};