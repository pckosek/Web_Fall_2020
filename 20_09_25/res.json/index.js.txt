#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express');
var path = require('path');
var hbs = require('hbs');

var app = express();


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM
app.set('port', 80 );

app.set('view engine', 'hbs');

// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

var foo = {
	'a' : [10,2,3,4, 50, 70],
	'one' : 'TEN is a number',
	'user' : {
		'name' : 'paul',
		'roles' : ['teacher', 'admin']
	}
}

app.get('/', function(req, res){

	var sent=false;

	if ('format' in req.query) {
		if (req.query.format=='json') {
			res.json(foo)
			sent=true;
		} 
	} 

	if (sent==false){
		res.render('one', foo);
	}

});




// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});