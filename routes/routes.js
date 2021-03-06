//Routes located in the routes folder
// app/routes/routes.js
var inventoryAPI = require("../api/inventoryAPI");
var customersAPI = require("../api/customersAPI");

module.exports = function(app, passport) {

    // =====================================
    // LOGIN/INDEX =========================
    // =====================================
	app.get('/', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('home');
		}
		else
			res.render('index');
	});
	app.get('/index', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('home');
		}
		else
			res.render('index');
	});
	//Authentication redirect routes
	// process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure home section
        failureRedirect : '/loginFailure', // redirect back to the login failure page
        failureFlash : true // allow flash messages for login errors - not set up
    }));
	
	// will match requests to home page
    app.get('/home', function (req, res) {
		if(req.isAuthenticated()) {
			res.render('home');
		}
		else
			res.render('index');
	});
	
	// will match requests to /customers
	app.get('/customers', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('customers');
		}
		else
			res.render('index');
	});
	
	// will match requests to /inventory
	app.get('/inventory', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('inventory');
		}
		else
			res.render('index');
	});
	
	// will match requests to /events
	app.get('/events', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('events');
		}
		else
			res.render('index');
	});
	
	// will match requests to /schedule
	app.get('/schedule', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('schedule');
		}
		else
			res.render('index');
	});
	
	// will match requests to /employees
	app.get('/employees', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('employees');
		}
		else
			res.render('index');
	});
	
	// will match requests to /reports
	app.get('/reports', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('reports');
		}
		else
			res.render('index');
	});
	
	// will match requests to /settings
	app.get('/settings', function (req, res) {
	  if(req.isAuthenticated()) {
			res.render('settings');
		}
		else
			res.render('index');
	});
	
	// will match requests to /loginFailure
	app.get('/loginFailure', function (req, res) {
	  res.render('loginFailure');
	});
	
	// =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    // =====================================
    // Routes to Inventory API =============
    // =====================================
	app.get('/api/inventoryapi', function(req, res){
		if(req.isAuthenticated()) {
			var collectionName = req.query.collection;
			var regex = new RegExp(req.query.search, 'i');
			var searchBy = req.query.searchby;
			var args = {};
			var collection=inventoryAPI[collectionName];
			args[searchBy]={$regex: regex};
			collection.find(args,function(err, boat) {
				if(err) {
					res.send(err);
				}
				else {	
					res.json(boat);
				}
			});
		}
		else
			res.render('index');
	});
	
	// =====================================
    // Routes to Customers API =============
    // =====================================
	app.get('/api/customersapi', function(req, res){
		if(req.isAuthenticated()) {
			var collectionName = req.query.collection;
			var regex = new RegExp(req.query.search, 'i');
			var searchBy = req.query.searchby;
			var args = {};
			var collection=customersAPI[collectionName];
			args[searchBy]={$regex: regex};
			collection.find(args,function(err, customer) {
				if(err) {
					res.send(err);
				}
				else {	
					res.json(customer);
				}
			});
		}
		else
			res.render('index');
	});
	
	app.post('/api/inventoryapi/insert', function(req, res){
		if(req.isAuthenticated()) {
			var addObject = new inventoryAPI.boat({
			  name: req.query.name
			, type: req.query.type
			, cost: req.query.cost
			});
			
			addObject.save(function(err, result) {
				if(err) {
					res.send(err);
				}
				else {	
					res.json("Added successfully.");
				}
			});
		}
		else
			res.render('index');
	});
	
	app.post('/api/inventoryapi/delete', function(req, res){
		if(req.isAuthenticated()) {
			var name = "name";
			var args = {};
			args[name] = {name: req.query.name}
			var delObject = new inventoryAPI.boat({
			});
			delObject.remove(args,function(err, result) {
				if(err) {
					res.send(err);
				}
				else {
					res.json(result);
				}
			});
		}
		else
			res.render('index');
	});
    
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the login page
    res.redirect('/');
}
