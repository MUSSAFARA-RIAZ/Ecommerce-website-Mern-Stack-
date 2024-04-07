const express=require("express")
const router=express.Router()

const {createUser,loginUser,UserLogout, ForgetPassword, ResetPassword, getUserDetails, updatePassword, updateProfile, getAllUser,getuserDetails,updateRoleUser, DeleteUser}=require("../controller/User.controller")
const { isauthenticatedUser, authorizedroles } = require("../middleware/auth")

router.route('/register').post(createUser)
router.route('/loginuser').post(loginUser)
router.route('/logout').get(UserLogout)
router.route('/password/forgetpassword').post(ForgetPassword)
router.route('/password/reset/:token').put(ResetPassword);
router.route('/getdetails').get(isauthenticatedUser,getUserDetails);
router.route('/password/updatepassword').put(isauthenticatedUser,updatePassword)
router.route('/updateuser').put(isauthenticatedUser,updateProfile)
router.route('/admin/getallusers').get(isauthenticatedUser,authorizedroles("admin"),getAllUser)
router.route('/admin/getuserdetails/:id').get(isauthenticatedUser,authorizedroles("admin"),getuserDetails)
router.route('/admin/updaterole/:id').put(isauthenticatedUser,authorizedroles('admin'),updateRoleUser)
router.route('/admin/deleteuser/:id').post(isauthenticatedUser,authorizedroles("admin"),DeleteUser)


module.exports=router