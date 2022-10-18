class ErrorHandeler extends Error{
    constructor(code, message) {
        super(message);
        this.message = `${code}$;$${message}`;
    }
}
module=module.exports=ErrorHandeler;