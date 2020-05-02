/* Require external APIs and start our application instance */
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var bcrypt = require('bcrypt');
//var request = require('request');

/* Configure our server to read public folder and ejs files */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'top secret code!',
    resave: true,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');

/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'u3r5w4ayhxzdrw87.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'xlkciosjknvj17b7',
    password: 'b6tvlxy5f63pe1qw',
    database: 'fdvgy10ospfmv9uf'
});
connection.connect();
//Local SQL Testing (To Be Deleted Once Project is Done)
/*const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'scooterdb'
});
connection.connect();*/

/* Middleware */
function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/');
    else next();
}

function isAdmin(req, res, next){
    if(!req.session.authenticated) res.redirect('/');
    else { 
    	//Checks if User is Admin
    	if (req.session.user == 1) {
    		next();
    	} else {
    		res.redirect('/travel');
    	}
    }
}

function checkUsername(username){
    let stmt = 'SELECT * FROM users WHERE username=?';
    return new Promise(function(resolve, reject){
       connection.query(stmt, [username], function(error, results){
           if(error) throw error;
           resolve(results);
       }); 
    });
}

function checkPassword(password, hash){
    return new Promise(function(resolve, reject){
       bcrypt.compare(password, hash, function(error, result){
          if(error) throw error;
          resolve(result);
       }); 
    });
}

/* The handler for the DEFAULT route */
app.get('/', function(req, res){
    res.render('login');
});

app.post('/login', async function(req, res){
    let isUserExist   = await checkUsername(req.body.uname);
    let hashedPasswd  = isUserExist.length > 0 ? isUserExist[0].password : '';
    let passwordMatch = await checkPassword(req.body.psw, hashedPasswd);
    if(passwordMatch){
        req.session.authenticated = true;
        req.session.user = isUserExist[0].id;
        if (req.body.uname == "admin") {
        	res.redirect('/admin');
        } else {
        	res.redirect('/travel');
        }
    }
    else{
        res.render('login', {error: true});
    }
});

/* Logout Route */
app.get('/logout', function(req, res){
   req.session.destroy();
   res.redirect('/');
});

/* The handler for the CREATE ACCOUNT route */
app.get('/createaccount', function(req, res){
    res.render('createaccount');
});

/* Create a new user - Add user into DBMS */
app.post('/createaccount', function(req, res){
	let salt = 10;
	bcrypt.hash(req.body.psw, salt, function(error, hash){
		if(error) throw error;
		connection.query('SELECT * FROM users;', function(error, result){
			if(error) throw error;
			if(result.length) {
			    var userId = result[result.length - 1].id + 1;
			    var stmt = 'INSERT INTO users (id, name, username, email, age,' + 
			    		   'password) VALUES (?, ?, ?, ?, ?, ?)';
			    var data = [userId, req.body.fname, req.body.uname, req.body.email, req.body.age, hash];
			    console.log(stmt);
			    connection.query(stmt, data, function(error, result){
			        if(error) throw error;
			        res.redirect('/');
			    });
			}
	   });
	});
});

/* The handler for the PROFILE route */
app.get('/profile', isAuthenticated, function(req, res){
	/*Will need to get logined user when login stuff is set up*/
    var stmt = 'select * from users where id=' + req.session.user + ';';
	connection.query(stmt, function(error, results){
	    var profile = null;
	    if(error) throw error;
	    if (results.length) {
	        profile = results[0];
	    }
	    res.render('profile', {profile: profile});
	});
});

/* Check USER Password before Deletion from Profile Page*/
app.post('/profile/:id/checkdelete', isAuthenticated, function(req, res){
    var stmt = 'Select * from users WHERE id='+ req.params.id + ';';
    connection.query(stmt, async function(error, result){
        if(error) throw error;
        if (result.length) {
        	let passwordMatch = await checkPassword(req.body.psw, result[0].password);
    		if (passwordMatch){
    			res.redirect('/profile/' + req.params.id + '/delete');
    		} else {
    			res.render('profile', {profile: result[0], error: true});
    		}
        }
    });
});

/* Delete a USER from Profile Page*/
app.get('/profile/:id/delete', isAuthenticated, function(req, res){
    var stmt = 'DELETE from users WHERE id='+ req.params.id + ';';
    connection.query(stmt, function(error, result){
        if(error) throw error;
        res.redirect('/');
    });
});

/* The handler for the TRAVEL route */
app.get('/travel', isAuthenticated, function(req, res){
    var stmt = 'select * from locations, pricing where locations.id = pricing.id;';
	connection.query(stmt, function(error, results){
	    var locations = null;
	    if(error) throw error;
	    if (results.length) {
	        locations = results;
	    }
	    res.render('travel', {locations: locations});
	});
});

app.get('/bookconfirm', isAuthenticated, function(req, res) {
    res.render('bookconfirm');
});

/* The handler for the API route */
/*
app.get('/api', function(req, res){
    res.render('api');
});
*/

/* The handler for the LOCATIONS route */
app.get('/locations', function(req, res){
    var locationsN, locationsNS, locationsZ = null;
    res.render('locations', {locationsN: locationsN, locationsNS: locationsNS, locationsZ: locationsZ});
});

app.get('/locationsbyname', function(req, res){
    var stmt = 'select * from locations where name = \'' 
                + req.query.lname + '\';';
	connection.query(stmt, function(error, results){
	    var locationsN, locationsNS, locationsZ = null;
	    if(error) throw error;
	    if (results.length) {
	        locationsN = results;
	    }
	    res.render('locations', {locationsN: locationsN, locationsNS: locationsNS, locationsZ: locationsZ});
	});
});

app.get('/locationsbynumscooters', function(req, res){
    var stmt = 'select * from locations where numOfDevices >= \'' 
                + req.query.numScooters + '\';';
	connection.query(stmt, function(error, results){
	    var locationsN, locationsNS, locationsZ = null;
	    if(error) throw error;
	    if (results.length) {
	        locationsNS = results;
	    }
	    res.render('locations', {locationsN: locationsN, locationsNS: locationsNS, locationsZ: locationsZ});
	});
});

app.get('/locationsbyzip', function(req, res){
    var stmt = 'select * from locations where api = \'' 
                + req.query.zip + '\';';
	connection.query(stmt, function(error, results){
	    var locationsN, locationsNS, locationsZ = null;
	    if(error) throw error;
	    if (results.length) {
	        locationsZ = results;
	    }
	    res.render('locations', {locationsN: locationsN, locationsNS: locationsNS, locationsZ: locationsZ});
	});
});

/* The handler for the ADMIN route */
app.get('/admin', isAdmin, function(req, res){
    var stmt = 'select * from locations, pricing where locations.id = pricing.id;';
	connection.query(stmt, function(error, results){
	    var trips = null, users = null, locations = null;
	    if(error) throw error;
	    if (results.length) {
	        trips = results;
	    }
	    res.render('admin', {users: users, locations: locations, trips: trips});
	});
});

app.get('/adminusers', isAdmin, function(req, res){
    var stmt = 'select * from users where name = \'' 
                + req.query.fname + '\';';
	connection.query(stmt, function(error, results){
	    var users = "noresult", locations = null, trips = null;
	    if(error) throw error;
	    if (results.length) {
	        users = results;
	    }
	    var stmt = 'select * from locations, pricing where locations.id = pricing.id;';
		connection.query(stmt, function(error, results){
		    if(error) throw error;
		    if (results.length) {
		        trips = results;
		    }
		    res.render('admin', {users: users, locations: locations, trips: trips});
		});
	});
});

/* Delete a USER from Admin Page*/
app.get('/admin/:id/deleteuser', isAdmin, function(req, res){
    var stmt = 'DELETE from users WHERE id='+ req.params.id + ';';
    connection.query(stmt, function(error, result){
        if(error) throw error;
        res.redirect('/admin');
    });
});

/* Edit a user record - Display a user information */
app.get('/admin/:id/edituser', isAdmin, function(req, res){
	//console.log(req.body);
    var stmt = 'SELECT * FROM users WHERE id=' + req.params.id + ';';
    connection.query(stmt, function(error, results){
    	var user = null;
		if(error) throw error;
		if(results.length){
		   user = results[0];
		}
		res.render('editaccount', {user: user});
    });
});

/* Edit a User record - Update a User in DBMS */
app.put('/admin/:id/updateaccount', isAdmin, function(req, res){
    var stmt = 'UPDATE users SET ' +
                'name = "'+ req.body.fname + '",' +
                'username = "'+ req.body.uname + '",' +
                'email = "'+ req.body.email + '",';
    if (req.body.psw != "") {
    	let salt = 10;
		bcrypt.hash(req.body.psw, salt, function(error, hash){
			if(error) throw error;
    		stmt += 'password = "'+ hash + '",' +
    				'age = "'+ req.body.age + '"' + 
    				'WHERE id = ' + req.params.id + ";";
    		console.log(req.body.psw, hash);
    		connection.query(stmt, function(error, result){
		        if(error) throw error;
		        res.redirect('/admin');
		    });
		});
    } else {
    	stmt += 'age = "'+ req.body.age + '"' + 
	    		'WHERE id = ' + req.params.id + ";";
	    //console.log(stmt);
	    connection.query(stmt, function(error, result){
	        if(error) throw error;
	        res.redirect('/admin');
	    });
    }
});

/* Edit a price record - Update a Price in DBMS */
app.put('/admin/updatetrip', isAdmin, function(req, res){
    var stmt = 'UPDATE pricing SET ' +
                'price = "'+ req.body.price + '"' +
                'WHERE id = ' + req.body.startLocation + ";";
    //console.log(stmt);
    connection.query(stmt, function(error, result){
        if(error) throw error;
        res.redirect('/admin');
    });
});

app.get('/adminlocations', isAdmin, function(req, res){
    var stmt = 'select * from locations where name = \'' 
                + req.query.locationName + '\';';
	connection.query(stmt, function(error, results){
	    var locations = "noresult", users = null, trips = null;
	    if(error) throw error;
	    if (results.length) {
	        locations = results;
	    }
	    var stmt = 'select * from locations, pricing where locations.id = pricing.id;';
		connection.query(stmt, function(error, results){
		    if(error) throw error;
		    if (results.length) {
		        trips = results;
		    }
		    res.render('admin', {users: users, locations: locations, trips: trips});
		});
	});
});

/* Edit a location record - Display a location information */
app.get('/admin/:id/editlocation', isAdmin, function(req, res){
    var stmt = 'SELECT * FROM locations WHERE id=' + req.params.id + ';';
    connection.query(stmt, function(error, results){
    	var location = null;
		if(error) throw error;
		if(results.length){
		   location = results[0];
		}
		res.render('editlocation', {location: location});
    });
});

/* Edit a Location record - Update a Location in DBMS */
app.put('/admin/:id/updatelocation', isAdmin, function(req, res){
    var stmt = 'UPDATE locations SET ' +
                'name = "'+ req.body.name + '",' +
                'numOfDevices = "'+ req.body.scooters + '",' +
                'api = "'+ req.body.zip + '"' +
                'WHERE id = ' + req.params.id + ";";
    //console.log(stmt);
    connection.query(stmt, function(error, result){
        if(error) throw error;
        res.redirect('/admin');
    });
});

/* Delete a location & pricing from Admin Page*/
app.get('/admin/:id/deletelocation', isAdmin, function(req, res){
    var stmt = 'DELETE from locations WHERE id='+ req.params.id + ';';
    connection.query(stmt, function(error, result){
        if(error) throw error;
        var stmt = 'DELETE from pricing WHERE id='+ req.params.id + ';';
	    connection.query(stmt, function(error, result){
	        if(error) throw error;
	        res.redirect('/admin');
	    });
    });
});

/* Create a new location - Add location & pricing into DBMS */
app.post('/admin/createlocation', isAdmin, function(req, res){
	connection.query('SELECT * FROM locations;', function(error, result){
		if(error) throw error;
		if(result.length) {
		    var locationId = result[result.length - 1].id + 1;
		    var stmt = 'INSERT INTO locations ' +
		              '(id, name, numOfDevices, api) '+
		              'VALUES (?, ?, ?, ?);';
		    var data = [locationId, req.body.locationName2, req.body.scooters, req.body.zip];
		    connection.query(stmt, data, function(error, result){
		    	//Create an Empty Pricing Entry for New Location
		        connection.query('SELECT * FROM pricing;', function(error, result){
					if(error) throw error;
					if(result.length) {
					    var priceId = result[result.length - 1].id + 1;
					    var stmt = 'INSERT INTO pricing ' +
					              '(id, price, tax, distance) '+
					              'VALUES (?, ?, ?, ?);';
					    var data = [priceId, "0", "0", "0"];
					    connection.query(stmt, data, function(error, result){
							if(error) throw error;
					        res.redirect('/admin');
					    });
					}
		        });
		    });
		}
   });
});

/* The handler for undefined routes */
app.get('*', function(req, res){
   res.render('error'); 
});

/* Start the application server */
app.listen(process.env.PORT || 3306, function(){
    console.log('Server has been started');
})