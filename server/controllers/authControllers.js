const bcrypt = require("bcryptjs")
const User = require("../Models/User");
const JWT = require("jsonwebtoken");

const JWT_Token = "MY_Secret_Code"

const generateToken = (id) => {
    return JWT.sign({ id }, JWT_Token, { expiresIn: '2h' });
};

exports.CreateAccount = async (req, res) => {

    const {
        firstName, lastName, emailID, passWord, role
    } = req.body

    try {

        const userEmail = await User.findOne({ emailID });

        if (userEmail)
            return res.status(400).json({ message: "User Already Exist!" });

        const user = await User.create({ firstName, lastName, emailID, passWord, role })

        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailID: user.emailID,
            role: user.role,
            token: generateToken(user._id)
        })

    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server Down" })
    }
};

exports.Login = async (req, res) => {

    const { emailID, passWord } = req.body;

    try {

        const UserEmail = await User.findOne({ emailID });

        if (!UserEmail)
            return res.status(400).json({ message: "Invalid Email" });

        const UserPassword = await bcrypt.compare(passWord, UserEmail.passWord);

        if (!UserPassword)
            return res.status(400).json({ message: "Invalid Password" });

        res.status(200).json({
            firstName: UserEmail.firstName,
            role: UserEmail.role,
            token: generateToken(UserEmail._id)
        });

    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server Down" })
    }

}