// Create Token and saving in cookie
const  jwt = require('jsonwebtoken');
const User=require("../../backend/models/user.models")

const sendToken = (user, statusCode, res) => {
    const token = user.jwtwebtoken();
  
    // options for cookie
    const options = {
      expire: new Date(
        // cookie_expire in days 
        
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };


module.exports = sendToken;