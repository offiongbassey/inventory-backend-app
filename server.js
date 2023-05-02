const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const app = express();
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const contactRoute = require("./routes/contactRoute");

const uri = 
"mongodb+srv://ntplus:08096097539@cluster0.x3ryd.mongodb.net/Pinvent-app?retryWrites=true&w=majority";
//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"], 
    credentials: true,
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

//Routes middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contact", contactRoute);
//Routes
app.get("/", (req, res) => {
    res.send("Home Page");

});
//error middleware
app.use(errorHandler);

async function connect() {
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

    }catch(error){
        console.log(error);
    }
}

connect();
app.listen(5000, () => {
    console.log("Server started at port 5000");
});
