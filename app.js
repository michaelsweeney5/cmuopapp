
//============Module Dependencies============

// get all the tools we need
var express = require('express');
var app = express.createServer();
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes.js');
mongoose.connect('mongodb://localhost/cmuopdatabase');
require('./config/passport')(passport); // pass passport for configuration

//Self-cooked requires -- might not be helpful
//var testclass = require('./node_modules/testclass/testclass.js');
//var authenticate = require('./node_modules/authenticate/authenticate.js');

//============Set Up App============
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout:false});
app.use(cookieParser()); // read cookies (needed for auth)	
app.use(bodyParser.urlencoded({ extended: true })); //for getting post data
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.json());
app.use(session({ secret: 'marginallyawesome' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.methodOverride());
app.use(express.static(__dirname));
app.use(app.router);


//============Routes============
// load our routes script and pass in our app and fully configured passport
require('./routes.js')(app, passport);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//============Class Test Functions============
//console.log(testclass.message);
//console.log(testclass.testclassmethod);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
