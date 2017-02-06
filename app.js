var express         = require("express");
var mongoose        = require("mongoose");
var path            = require("path");
var bodyParser      = require("body-parser");
var cookieParser    = require("cookie-parser");
var session         = require("express-session");
var flash           = require("connect-flash");
var jwt             = require("jsonwebtoken");
var passport        = require("passport")

//if you add one, dont forget to add app.use at the end
var routes      = require("./routes/routes");
var User        = require("./models/user");
var config      = require("./main");

var app = express();
mongoose.connect("mongodb://localhost:27017/flashcards");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());//**  extra  **
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())


app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, "client")));

app.use(flash());

app.use(passport.initialize());
require("./routes/passport")(passport);

var apiRoutes = express.Router();

apiRoutes.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({
        username: username
    }, function (err, user) {
        if(err) console.log(err);
        if(! user){
            res.json({success: false, message: "User not found"});
        }else{
            user.checkPassword(password, function (err, isMatch) {
                if(isMatch){
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10000
                    });
                    res.json({success: true, token: 'JWT ' + token});
                }else{
                    res.json({success: false, message: "incorrect password"});
                }
            })
        }
    })
});

apiRoutes.get("/dash", passport.authenticate("jwt", {session: false}), function (req, res) {
    res.send("it worked user id is: " + req.user._id);
});

app.use(apiRoutes);
app.use(routes);



app.listen(app.get("port"), function () {
    console.log("server started on port " + app.get("port"));
});


