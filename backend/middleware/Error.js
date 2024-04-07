const ErrorHandler = require('../utils/ErrorHandler');

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
// cast error for mongodb id like in update api i pass the id to it if i increase the length of the id 
// that mongodb accept to yeh cast error deta h 

    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    if(err.code ===11000){
        const message=`Duplicate Key Error ${Object.keys(err.keyValue)}`
        err=new ErrorHandler(message,400)
    }
    if(err.name ==="JsonWebTokenError"){
        const message=`Invalid json web Token`
        err=new ErrorHandler(message,400)
    }
    // if(err.name="TokenExpiredError"){
    //     const message=`Token expired`

    //     err=new ErrorHandler(message,400)
    // }
    

  

    res.status(statusCode).json({ success: false, statusCode,
      
      
      message:err.message});
};

module.exports = errorHandler;
