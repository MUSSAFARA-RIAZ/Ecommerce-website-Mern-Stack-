const express=require("express")
const router=express.Router()

const {createUser,loginUser}=require("../controller/User.controller")
router.route('/register').post(createUser)
router.route('/loginuser').post(loginUser)
module.exports=router