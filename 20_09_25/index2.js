#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('view engine', 'hbs')
app.set('port', 80 );


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req,res) {
	res.send('default')
} );

function getNumberFromUser(req,res,next) {
	var the_number = Number(req.params.page_number);
	console.log(the_number)
	if (isNaN(the_number)==false) {
		// store the number and pass is along
		res.locals.the_number = the_number;
		next()
	} else {
	    res.send('please enter a number');

	}
}

app.get('/:page_number', getNumberFromUser, function(req, res){
	
	var special_number = res.locals.the_number;
	res.render('index', {'special_number':special_number});

});




// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});