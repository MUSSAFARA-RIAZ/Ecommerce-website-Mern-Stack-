const User = require("../models/user.models");
const ErrorHandler = require("../utils/ErrorHandler");
const catchasyncHandlerfunc = require("../middleware/CatchasyncHandler");
const sendToken = require("../utils/getjwttoken");
const crypto = require('crypto');
const sendEmail = require("../utils/sendEmail")

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

exports.UserLogout = catchasyncHandlerfunc(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: "Logout successfully"
  })
})
// forget password 
// exports.ForgetPassword=catchasyncHandlerfunc(async(req,res,next)=>{
//   // const  resetPasswordLink=req.protocol+"://"+req.get('host')+'/resetpassword'
//   const user= await  User.findOne({email:req.body.email});
//   if(!user){
//     return next(new ErrorHandler("Not found"),404)
//   }
//   const resetToken =user.getResetPasswordToken();


//   await user.save({validateBeforeSave :false});
//   const resetPasswordUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
//   const message=`Your password reset Token is \n\n  ${resetPasswordUrl} \n\n if you havenot requested this email then ignore it `;
//   try{

//     // const transporter = nodemailer.createTransport({
//     //   service: 'gmail',
//     //   auth: {
//     //     user: 'your-email@gmail.com',
//     //     password: 'your-email-password'
//     //   }
//     // });

//     // await transporter.sendMail({
//     //   from: '"Password Reset" <your-email@gmail.com>',
//     //   to: user.email,
//     //   subject: 'Password Reset Request',
//     //   text: message
//     // });

//     // res.status(200).json({
//     //   success: true,
//     //   message: 'Password reset link sent to your email.'
//     // });
//     await sendEmail({
//       email:user.email,
//       subject:`Recovery email`,
//       message,

//     })
//     res.status(200).json({
//       success:true,
//       message:`Email sent to ${user.email}`
//     })



//   }catch(error){
//     user.resetWebtoken=undefined;
//     user.resetPasswordExpire=undefined;
//     await user.save({validateBeforeSave :false});
//     return next (new ErrorHandler(error.message,500));



//   }


// })
exports.ForgetPassword = catchasyncHandlerfunc(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset Token is \n\n ${resetPasswordUrl} \n\n if you havenot requested this email then ignore it`;

    // Sending email
    await sendEmail({
      email: user.email,
      subject: `Recovery email`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
exports.ResetPassword = catchasyncHandlerfunc(async (req, res, next) => {
  // console.log("tttttttttttttttt", req.params.token)
  const resetWebtoken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    resetWebtoken,
    resetPasswordExpire: { $gt: Date.now() }
  })
  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid", 404))

  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("PASSWORD NOT MATCHED", 404))


  }

  user.password = req.body.password;
  user.resetWebtoken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save()
  sendToken(user, 200, res);
})
// let's assume login user is mussafarariaz@gmail.com and you want to access this user detail. but in route we haveapplied h condition

// user must be loign 
exports.getUserDetails = catchasyncHandlerfunc(async (req, res, next) => {

  const user = await User.findById(req.user.id)
  res.status(200).json({ success: true, data: user })



})

exports.updatePassword = catchasyncHandlerfunc(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")

  const matchpassword = await user.comparePassword(req.body.oldpassword)
  if (!matchpassword) {
    return next(new ErrorHandler("password not matched", 404))
  }
  if (req.body.newpassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("newly entered password and confirm password not matched", 400))
  }
  user.password = req.body.newpassword;
  await user.save()

  sendToken(user, 200, res);


  // res.status(200).json({success:true,user})


})

exports.updateProfile = catchasyncHandlerfunc(async (req, res, next) => {

  const newuser = {
    name: req.body.name,
    email: req.body.email,

  }
  const user = await User.findByIdAndUpdate(req.user.id, newuser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  await user.save()
  res.status(200).json({ success: true })



})
// only admin can access all the users 
exports.getAllUser = catchasyncHandlerfunc(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });

})
// for accessing particular user 
exports.getuserDetails = catchasyncHandlerfunc(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }
  res.status(200).json({ success: true, user })

})
// admin update role of the user 
exports.updateRoleUser = catchasyncHandlerfunc(async (req, res, next) => {
  const newuser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  }
  const user = await User.findByIdAndUpdate(req.user.id, newuser, {
    new: true,
    useFindAndModify: false,
    runValidators: true



  })
  await user.save()

  res.status(200).json({ success: true, msg: "User Role has been updated", user })

})
exports.DeleteUser=catchasyncHandlerfunc(async(req,res,next)=>{
  const user= await User.findById(req.params.id)
  if(!user){
    return next(new ErrorHandler("Cant deleted because user doesnot exist",403))

  }
  await user.deleteOne()
  user.save()
  
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });

})