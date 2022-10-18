const express= require('express');
const tokenVerifier = require('../tokenAndValidations/tokenValidator');
const posts=express.Router();

posts.get('/',tokenVerifier,(req,res)=>{
    res.send('Inside posts '+JSON.stringify(req.user));
})

module.exports=posts;