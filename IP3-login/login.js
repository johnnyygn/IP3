var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/ip3loginpage.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('The Username and/or Password is incorect');
			}			
			response.end();
		});
	} else {
		response.send('Type your Username and Password');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome!' + request.session.username + '!');
	} else {
		response.send('Plese login first!');
	}
	response.end();
});

app.listen(8000);
