var mongoose = require("mongoose");

var deckSchema = mongoose.Schema({
    deckName:       { type: String, required: true },
    literalName:    { type: String, required: true },
    owner:          { type: String, required: true },
    createdAt:      { type: Date, default: Date.now },
    flaschards:     { type: Number, default: 0 }
});

var Deck = mongoose.model("Deck", deckSchema);
module.exports = Deck;