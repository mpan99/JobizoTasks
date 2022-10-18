const jwt= require('jsonwebtoken');

const tokenVerifier=(req,res,next)=>{
    const token= req.header('auth-token');
    console.log('Inside token verifier: ', token);
    if(token) {
        try{
            let verified=jwt.verify(token,"fdjkljldfjljfkdjs");
            req.user=verified;
            
            next();
        }
        catch(err){
            res.end(err);
        }
        
    } 
    else{
        res.status(400).send('Token not found');
    }
}

module.exports=tokenVerifier;