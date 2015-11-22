//passport.js located in app root/config/
// config/passport.js
var sha256 = require('sha256');
//Load passport local strategy
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and maybe a signup in the future
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-login', new LocalStrategy(function(username, password, done) {
	  process.nextTick(function() {
		User.findOne({'username': username}, function(err, user) {
		  if (err) {
			return done(err);
		  }

		  if (!user) {
			return done(null, false);
		  }
		  //Found a valid user
		  var salt = user.salt;
		  hash = sha256(password) + salt;
		  if (user.password != hash) {
			return done(null, false);
		  }
		  //Password hashes matched
		  //Create Session
		  return done(null, user);
		});
	  });
	}));

};