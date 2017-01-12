var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({
    username:       { type: String, required: true, unique: true },
    password:       { type: String, required: true },
    createdAt:      { type: Date, default: Date.now },
    displayName:    { type: String },
    role:           { type: String },
    email:          { type: String, required: true, unique: true}
});

userSchema.methods.name = function () {
    return this.displayName || this.username;
}

//*********** Password encryption ***********
var SALT_FACTOR = 10; //encryption strength

var noop = function() {};

userSchema.pre("save", function (done) {
    var user = this;
    if(!user.isModified("password")){
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if(err){ return done(err);}
        bcrypt.hash(user.password, salt, noop,
            function (err, hashedPassword) {
                if(err) { return done(err); }
                user.password = hashedPassword;
                done();
            });
    });
});

//********** Password Comparison **********
userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    })
}

//********** Export ************
var User = mongoose.model("User", userSchema);
module.exports = User;