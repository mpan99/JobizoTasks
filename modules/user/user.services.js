const User= require('./user.model');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const { AlreadyLoggedIn } = require('../../exceptions/errors/AlreadyLoggedIn');

const userService={

    getAUser: async function(param){
        try{
            console.log(param.email);
            const foundUser= param.email ? await User.find({email: JSON.stringify(param.email)}) :await User.find() ;
            console.log(foundUser);
            return {
                status: true,
                data: foundUser
            }
        }
        catch(err){
            return{
                status:false,
                data: err
            }
        }
    },

    createAUser:async function(user){
        console.log('Inside userService:: createAUser');
        const exist= await this.getAUser(user);
        if(exist.data) return({
            success: false,
            data: " User already exist"
        })
        else{
        // Password hash
        const salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(user.password,salt)  ;
               
        try{
        console.log('Inside try:: createAUser');

            const savedUser = await User.create({
                name: user.name,
                email:user.email,
                password: hashedPass,
                city: user.city
            });
            return {
                success:true,
                data:savedUser
            }
        }
        catch(err){
        console.log('Inside catch:: createAUser', err);

            return {
                success:false,
                data:err
            }
        }
    }
    },

    

    getAUserById: async function(id){
        try{
            const foundUser=await User.findById(id);
            console.log(foundUser);
            return {
                status: true,
                data: foundUser
            }
        }
        catch(err){
            return{
                status:false,
                data: err
            }
        }
    
    },

    updateAUserById: async (id,updates) =>{
        try{
            const updatedUser=await User.findByIdAndUpdate(id,updates,{ useFindAndModify: false})
            console.log(updatedUser);
            return {
                    status: true,
                    data: updatedUser
                }
        }
        catch(err){
            return{
                status:false,
                data: err
            }
        }
    },

    deleteAUserById: async (id)=>{
        try{
            const deletedUser=await User.findByIdAndDelete(id);
            return {
                    status: true,
                    data: deletedUser
                }
        }
        catch(err){
            return{
                status:false,
                data: err
            }
        }
    },

    loginAUser:async  (email, password, token)=>{

        const existingToken= await User.findByToken(token);

        console.log('Inside userService/loginAUser',existingToken);
        if(existingToken.success){
            // throw new AlreadyLoggedIn(existingToken.data);
            return{
                success: false,
                data: "Already Logged In"
            }
        }
        else{
            console.log('email in req',email,password);
            const existingUser= await User.findOne({email});
            if(!existingUser) {
                return{
                    success: false,
                    data: "Email not exist"
                }
            }
            const verified=existingUser.comparePassword(password);
            if(verified) {
                const token=await  existingUser.generateToken();
                return {
                    success: true,
                    data: token
                }
            }
            else{
                return{
                    success: false,
                    data: "Incorrect Password"
                }
            }
        }
    },

    logoutAUser:(req)=>{
        return req.user.methods.deleteToken(req.token);

    },

    

}

module.exports= userService;
