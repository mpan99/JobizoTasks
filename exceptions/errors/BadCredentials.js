import ErrorHandeler from "../Errorhandeler";


export class BadCredentials extends ErrorHandeler{
    constructor(message,user){
        super(message,user,'BAD_REQUEST')
    }
    trigger(){
        if(this.message==='NotAValidJSON') console.warn(this.data, 'Not a valid JSON');
        
    }
}