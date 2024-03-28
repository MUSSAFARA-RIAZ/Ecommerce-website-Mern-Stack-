const mongoose=require("mongoose")
const validator=require("validator")

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide a valid name"]

    },
    email:{
        type:String,
        required:[true,"please provide a valid email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide a valid password"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    avatar:{
        
            publicid: {
              type: String,
              required: [true, "Please provide a product image publicid"],
            },
            url: {
              type: String,
              required: [true, "Please provide a product image url"],
            },
          
        
        },
        resetWebtoken:String,
        resetPasswordExpire:String,

    






});
module.exports=mongoose.model("User",UserSchema)
