//============Module Dependencies============
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');
Mongoose.connect('mongodb://localhost/cmuopdatabase');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sha256 = require('sha256');
var fs = require('fs');
var buffer = new Buffer(32);

//============Process program arguments/Generate Salt/Add to DB============

var username = process.argv[2];
var password = sha256(process.argv[3]);
var hash;
var salt = "";

function randomInt() {
	var x = Math.ceil(Math.random()*125) + 33;
	console.log(x);
	return x;
}
for(i=0;i<16;i++) {
	salt += randomInt().toString(16);
}
hash = password + salt;
console.log("username = " + username);
console.log("password = " + password);
console.log("salt = " + salt);
console.log("hash = " + hash);
//insert new user into db with user, hash, salt		

var db = new Db('cmuopdatabase', new Server('localhost', 27017));
// Fetch a collection to insert document into
db.open(function(err, db) {
  var collection = db.collection("users");
  // Insert a single document
  collection.insert({username:username, password:hash, salt:salt});
});

console.log("done");


