const express=require("express")
const router=express.Router()

const {createUser,loginUser,UserLogout, ForgetPassword}=require("../controller/User.controller")
router.route('/register').post(createUser)
router.route('/loginuser').post(loginUser)
router.route('/logout').get(UserLogout)

router.route('/password/forgetpassword').post(ForgetPassword)

module.exports=router