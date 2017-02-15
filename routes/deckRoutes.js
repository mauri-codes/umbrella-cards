var express         = require("express");

var Deck            = require("../models/deck");
var Flashcard       = require("../models/flashcard");
var User            = require("../models/user");

var router = express.Router();

function randomChar(){// from A to Z
    var x = Math.floor((Math.random()*26)+65);
    return String.fromCharCode(x);
}
function randomNumber() {//from 0 to 9
    return Math.floor((Math.random()*10));
}
function deckCode(){//random string like DRS1234
    var x = randomChar()+randomChar()+randomChar();
    var y = randomNumber()+""+randomNumber()+
        ""+randomNumber()+""+randomNumber();
    return x + y;
}

router.get("/hello", function (req, res, next) {
    res.json({one: deckCode()});
    //next();
});

router.post("/getdecks", function (req,res) {
    var owner   = req.body.user;
    Deck.find({owner: owner}).exec(function(err, decks){
        if(!err){
            res.json(decks);
        }else console.log("error");
    });
});

router.post("/newdeck",function (req, res) {
    var deckname    = req.body.deckname;
    var owner       = req.body.owner;
    var id          = deckCode();
    Deck.findOne({id: id}, function (err, deck) {
        if(err){
            res.json({success: false, message: "database error"});
        }else if(deck){
            res.json({success: false, message: "id already exists"});
        }else{
            console.log(deckname + "   " + id + "   " + owner);
            var newDeck = new Deck({
                deckName: deckname,
                owner: owner,
                id: id
            });
            newDeck.save();
            res.json({success: true, message: "Deck created successfully"});
        }
    });

});

router.post('/getflashcards', function (req, res, next) {
    var owner =     req.body.user;
    var deckID =    req.body.deck;
    Deck.findOne({id: deckID}, function(err, deck){
        if(!err){
            if(deck){
                if(deck.owner == owner || deck.type == 'public'){
                    next();
                }else{
                    res.json({success: false, message: 'private deck'});
                }
            }else{
                res.json({success: false, message: 'no such deck'});
            }
        }else res.json({success: false, message: 'server error'});
    });
});

router.post("/getflashcards", function (req, res) {
    var deckID = req.body.deck;
    Flashcard.find({deck: deckID}).exec(function (err, flashcards) {
        if(!err){
            res.json({success: true, flashcards: flashcards});
        }else{
            res.json({success: false, message: 'server error'});
        }
    });
});

module.exports = router;