const mongoose = require('mongoose');
const passPortLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    resetPasswordToken:String,
    resetPasswordExpires:Date
});

// adicionando o plugin do passport
userSchema.plugin(passPortLocalMongoose, { usernameField:'email'});

module.exports = mongoose.model('User', userSchema);