var mongoose = require("mongoose");

var flashcardSchema = mongoose.Schema({
    front:          { type: String, required: true },
    back:           { type: String, required: true },
    createdAt:      { type: Date, default: Date.now },
    deck:           { type: String, required: true }
});

var Flashcard = mongoose.model("Flashcard", flashcardSchema);
module.exports = Flashcard;