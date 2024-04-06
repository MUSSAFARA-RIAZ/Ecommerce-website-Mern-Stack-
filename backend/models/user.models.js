const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
// built in 
const crypto = require("crypto")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a valid name"]


    },
    email: {
        type: String,
        required: [true, "please provide a valid email"],

        validate: [validator.isEmail, "please provide a real email"]
    },
    password: {
        type: String,
        required: [true, "please provide a valid password"],
        minLength: [8, "cant exeed to 8 characters"],

        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    avatar: {

        publicid: {
            type: String,
            required: [true, " publicid"],
        },
        url: {
            type: String,
            required: [true, "Please provide a product image url"],
        },


    },
    resetWebtoken: String,
    resetPasswordExpire: String,








}, { timeStamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();

    }
    else {
        this.password = await bcrypt.hash(this.password, 10)

    }


})

UserSchema.methods.jwtwebtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE


    })
}
UserSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)

}

UserSchema.methods.getResetPasswordToken = async function () {
    // generating token

    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashing and Adding to user schema

    this.resetWebtoken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now() + 15 *60 * 1000;
    return resetToken;
    


}

module.exports = mongoose.model("myuser", UserSchema)
