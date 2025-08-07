const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    emailID: { type: String, required: true },
    role: { type: String, required: true, default: "user" }
})

module.exports = mongoose.model("user", UserSchema);