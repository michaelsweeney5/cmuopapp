//Inventory API gives routes access to mongoose models
//Will contain all models or modularize?? not sure
var boat = require("../models/boat");
var bike = require("../models/bike");
var tent = require("../models/tent");
var climbing = require("../models/climbing");
exports.boat = boat;
exports.bike = bike;
exports.tent = tent;
exports.climbing = climbing;