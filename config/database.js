const mongoose= require('mongoose');
const configs= require('./env-files/development.json')

const dbConnection= async ()=>{
    try{
        mongoose.connect(configs.dbConectionString,console.log('Connected with DB'))
    }
    catch(err){
        console.log(err);
    }
}



module.exports=dbConnection;