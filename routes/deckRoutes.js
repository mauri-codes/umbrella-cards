var express         = require("express");

var Deck            = require("../models/deck");
var Flashcard       = require("../models/flashcard");
var User            = require("../models/user");

var router = express.Router();

router.get("/hello", function (req, res, next) {
    res.json({"his": "history"});
    //next();
});

module.exports = router;