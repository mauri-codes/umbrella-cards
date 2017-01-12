var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");

//if you add one, dont forget to add app.use at the end
var routes = require("./routes/routes");

var app = express();
mongoose.connect("mongodb://localhost:27017/flashcards");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());//**  extra  **
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, "client")));

app.use(flash());
app.use(routes);


app.listen(app.get("port"), function () {
    console.log("server started on port " + app.get("port"));
});


