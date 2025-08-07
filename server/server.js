const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "SecretCode";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("The Server is Running Properly");
})

app.post("/createAccount", async (req, res) => {

    const UserData = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        emailID: req.body.emailID,
        role: req.body.role || "user"
    });

    if (!UserData) return res.send(401).json({ messgae: "Fill all the Details" });

    await UserData.save();

    return res.status(200).json({ message: "User Created Successfully" });

})

app.post("/login", async (req, res) => {
    try{
        const { emailID, password } = req.body;

        if(!emailID && !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        const userData = await User.findOne({ emailID });

        if(!userData) 
            return res.status(404).json({ message: "Invalid E-Mail ID" });

        if(userData.password !== password)
            return res.status(401).json({ message: "Invalid Password" });

        const jwtToken = jwt.sign(
            { id: userData._id, name: userData.firstName },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login Successful", jwtToken })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
})

mongoose.connect("mongodb+srv://LMS:LMS@cluster0.ptaoj2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(5000, () => console.log("The Port is Connected to 5000"));