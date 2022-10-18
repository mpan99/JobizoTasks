const User=require('./../modules/user/user.model');

const auth =async (req,res,next)=>{
    try{
        console.log('Inside auth');
        let token =req.header('auth-token');
        const theUser=await User.findByToken(token);

        req.token= token;
        req.user=theUser;
        next();
    }
    catch(err){
        console.log(err);
        return res.json({
            success: false,
            data: err
        })
    }
}

module.exports={auth};