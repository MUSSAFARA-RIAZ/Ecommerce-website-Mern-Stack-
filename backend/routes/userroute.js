const express=require("express")
const router=express.Router()

const {createUser,loginUser,UserLogout}=require("../controller/User.controller")
router.route('/register').post(createUser)
router.route('/loginuser').post(loginUser)
router.route('/logout').get(UserLogout)
module.exports=router