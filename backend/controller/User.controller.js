const User = require("../models/user.models");
const ErrorHandler = require("../utils/ErrorHandler");
const catchasyncHandlerfunc = require("../middleware/CatchasyncHandler");
const sendToken = require("../utils/getjwttoken");
// **********************REGISTER USER
exports.createUser = catchasyncHandlerfunc(async (req, res, next) => {
  // const newuser=await User.create(req.body);





  const { name, email, password } = req.body;
  const newuser = await User.create({
    name,
    email,
    password,
    avatar: { publicid: "this is my public id", url: "this is image url" },
  });

  sendToken(newuser, 201, res);

  // const token=newuser.jwtwebtoken();
  // res.status(201).json({
  //     success:true,
  //     // newuser,
  //     token,

  // })
});


exports.loginUser = catchasyncHandlerfunc(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  /// we saved token in cookie not in local storage 
  
  sendToken(user, 200, res);

  // const token=user.jwtwebtoken();
  // res.status(200).json({
  //     success:true,
  //     user,
  //     // newuser,
  //     token,

  // })
});

exports.UserLogout=catchasyncHandlerfunc(async(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).json({
    success:true,
    message:"Logout successfully"
  })
})
