const mongoose = require("mongoose");
const bcrypt  = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: [true, "Enter Your First Name"]
    },

    lastName: {
        type:String,
        required: [ true, "Enter Your Last Name"]
    },

    emailID: {
        type: String,
        required: [ true, "Enter your Email-ID" ]
    },

    passWord: {
        type:String,
        required: [ true, "Enter your password" ]
    },

    role: {
        type: String,
        enum: [ "user", "mentor", "instructor", "admin" ],
        default: "user"
    },

}, {timestamps: true}) ;

UserSchema.pre("save", async function(next) {

    if(!this.isModified("passWord"))
        return next();

    const salt = await bcrypt .genSalt(10);
    this.passWord = await bcrypt .hash(this.passWord, salt);
    next();

})

module.exports = mongoose.model("user", UserSchema);