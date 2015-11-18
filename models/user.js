//Model user.js located in approot/models
// load the things we need
var mongoose = require('mongoose');
var sha1 = require('sha1');

//============Mongoose Schema for Auth/Sessions user model============
var userSchema = mongoose.Schema({
        username     : String,
        password     : String,
        salt		 : String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);