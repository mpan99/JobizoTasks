const ErrorHandeler = require("../Errorhandeler");


class AlreadyLoggedIn extends ErrorHandeler{
    
     constructor(user){
        super(user);
    }
}
module.exports=AlreadyLoggedIn;