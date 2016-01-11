//Model customer.js located in approot/models
// load the things we need
var mongoose = require('mongoose');

//============Mongoose Schema for Boat model============
var customerSchema = mongoose.Schema({
        number			: String,
        name			: String,
        isStudent		: Boolean,
        isAlumn			: Boolean,
        isStaff			: Boolean,
        balance			: Number
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Customer', customerSchema);