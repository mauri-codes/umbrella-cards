var nodemailer =    require("nodemailer");

var config      = require("../main");

exports.sendEmail = function (text, towhom, subject){
    var mymail = config.sender;
    var mypass = config.senderpass;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: mymail,
            pass: mypass
        }
    });
    var mailOptions = {
        from: mymail,
        to: towhom,
        subject: subject,
        text: text
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return {status: "error", error: error};
        }else{
            return {status: "success", message: info.response};
        }
    });
};
//this function returns a random string for the verificacion mail
exports.randomString = function (n) {
    var result = "";
    var posible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i<n; i++){
        result += posible.charAt(randomNumber(0, 61));
    }
    return result;
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}