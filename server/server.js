const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("./Routes/UserRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("The Server is Running Properly");
})

app.use("/auth", UserRoute); 

mongoose.connect("mongodb+srv://LMS:LMS@cluster0.ptaoj2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(5000, () => console.log("The Port is Connected to 5000"));