import ErrorHandeler from "../Errorhandeler";

export class PartialError extends ErrorHandeler{
    constructor(message,user){
        super(message,user,'PARTIAL')
    }
    trigger(){
        // if(this.message==='NotAValidJSON') console.warn(this.d);
        const obj=this;
        Sentry.send('Some error occured in appplication. which is partial: ', JSON.stringify({
            message:obj.message,
            data:obj.data,
            type:obj.type
        }))
    }
}