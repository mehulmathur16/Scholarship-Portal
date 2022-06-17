var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/doitdb', { useNewUrlParser: true });
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema = new mongoose.Schema({
    password: String,
    fullname: String,
    username: String,  //email
    category: String,
    spass10: String,
    spass12: String,
    spassgrad: String,
    state: String,
    branch: String,
    income: Number

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
