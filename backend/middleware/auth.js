const ErrorHandler = require("../utils/ErrorHandler");
// const CatchasyncHandler = require("./CatchasyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

exports.isauthenticatedUser =async (req, res, next) => { 
    try {
        const { token } = req.cookies;
        console.log(token);

        if (!token) {
            throw new ErrorHandler("Please login first", 404);
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
};

// module.exports = isauthenticatedUser;

exports.authorizedroles=(...roles)=>{
    return (req,res,next)=>{
        // its means user h to allow nh 
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role : {req.user.role} is not authorized to do this operation`),403)
        }
        // if admin hi to next() execute and excess resources or create resources 

        next()


    }
}