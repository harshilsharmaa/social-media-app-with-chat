const express = require("express")
const app = express();
const path = require('path')

if(process.env.NODE_ENV !=="production"){
    require("dotenv").config({path: "./config/config.env"});
}


const cookieParser = require("cookie-parser");


const cors = require('cors');

app.use(cors());

// Using Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());



// import routes
const post = require("./routes/post");
const user = require("./routes/user");
const conversations = require("./routes/conversations");
const messages = require("./routes/messages");

// using routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", conversations);
app.use("/api/v1", messages);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


module.exports = app;
