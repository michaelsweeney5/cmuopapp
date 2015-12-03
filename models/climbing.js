//Model climbing.js located in approot/models
// load the things we need
var mongoose = require('mongoose');

//============Mongoose Schema for Boat model============
var climbingSchema = mongoose.Schema({
        name			: String,
        type			: String,
        price			: String,
        timesRented		: Number,
        beingRepaired	: Boolean
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Climbing', climbingSchema);