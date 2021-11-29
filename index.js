const express = require("express");
const path = require("path");
const MongoClient = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const params = require("./params/params");
const cookieParser = require("cookie-parser");

const app = express();
mongoose.connect("params.DATABASECONNECTION",{useUnifiedTopology : true,useNewUrlParser:true,useCreateIndex:true});

app.set("port",process.env.port || 3001);
app.set("views",path.join(__dirname,"views"));
app.set("view engine" ,"ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
  secret:"fsjverkvl",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/",require("./routes/web"));
app.use("/api",require("./routes/api"));


app.listen(app.get("port"), function() {
    console.log(`Server running on port` + app.get("port"));
  });