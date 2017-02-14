var express         = require("express");
var path            = require("path");
var mailsender      = require("./mailSender");
var passport        = require("passport");
var jwt             = require("passport-jwt");


var User        = require("../models/user");
var config      = require("../main");

var router = express.Router();

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", function (req, res, next) {
    //res.json({"his": "history"});
    next();
});

router.get('/getusers', function (req, res) {
    User.find().exec(function (err, user) {
        if(err){ }
        res.json(user);
    });
});
router.get('/getuser/:username', function (req, res) {
    username = req.params.username;
    User.findOne({username: username}, function (err, user) {
        if(err){ res.json({response: "error", error: err})}
        else if(user){
            res.json({response: "success", user: user});
        }
        else{
            res.json({response: "error", error: "no user found"});
        }
    });
});

router.post("/signup", function (req, res) {
    //console.log(mailsender.randomString(30));
    var username = req.body.username;
    var email    = req.body.email;
    var password = req.body.password;
    var veriCode  = mailsender.randomString(30); //verification code
    User.findOne({ $or:[ {username:username}, {email:email} ]}, function (err, user) {
        if(err)
            res.json({ response: "error", error: err});
        else if(user) {
            if (user.username == username)
                res.json({response: "error", error: "user already exists"});
            else if (user.email == email)
                res.json({response: "error", error: "email in use"});
            else
                res.json({response: "error", error: "unknown error."});
        }else{
            var newUser = new User({
                username: username,
                password: password,
                email: email,
                validated: veriCode
            });
            newUser.save();
            mailsender.sendEmail("confirm your account clicking in the folowing link --> " +
                "http://localhost:3000/verify?code=" + veriCode,
                email, "confirm your account");
            res.json({response: "success"});
        }
    });
});
router.get("/verify/:code", function (req,res) {
    var code = req.params.code;
    //alternatively
    //http://localhost:3000/verify?code=123
    //var code = req.query.code; with router.get("/verify")
    User.findOneAndUpdate(
        {validated: code}, //search for such code amongst users
        {validated: "yes"}, //change to this if found
        function (err, user) {
            if(err)                 res.json({response: "error", detail: err});
            else if(user == null)   res.json({response: "error", detail: "incorrect url"});
            else                    res.json({response: "success", user: user});
        });
});
router.post("/deleteuser", function (req, res) {
    var username = req.body.username;
    User.remove({username: username}, function (err) {
        if(err)     res.json({response: "error", error: err});
        else        res.json({response: "success"});
    });
});

router.post("/changerole", function (req, res) {
    var username = req.body.username;
    User.findOne({username: username}, function (err, user) {
        if(err){ res.json({response: 'error', error: err})}
        else if(user){
            var roleToChange= "admin";
            if(user.role === "admin")
                roleToChange = "client";
            User.findOneAndUpdate(
                {username: user.username}, //search for such code amongst users
                {role: roleToChange}, //change to this if found
                function (err, userf) {
                    if(err)                 res.json({success: false, message: err});
                    else if(userf)          res.json({success: true, role: roleToChange});
                    else                    res.json({success: false, message: "no such user found"});
                });
        }else{
            res.json({response: "error", error: "no such user found."});
        }
    });
});


// app.use(passport.initialize());
// var require('../main');


//************************************************************************
//this one redirects every non recognized route to the angular client side
//************************************************************************
router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// to send emails

module.exports = router;