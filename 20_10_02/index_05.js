#!/usr/bin/nodejs

// -------------- load packages -------------- //

var express = require('express')
var app = express();
var hbs = require('hbs');

// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );
app.set('view engine', 'hbs')
app.use(express.static('static'));

// -------------- express 'get' handlers -------------- //

app.get('/', function(req, res){
    /// ...
    res.render( 'index' );
});

function my_wait_fcn(req,res,next) {
	var delay_ms = req.query.delay_ms;

    setTimeout( function() {
        res.locals.my_string = 'Mr. '
        next();
    }, delay_ms)
}

function my_other_fcn(req,res,next) {
    res.locals.my_string += 'Monster'
    next()
}

app.get('/mid', [my_wait_fcn, my_other_fcn], function(req,res){

    var my_string = res.locals.my_string;
    res.render('example', { 'u_name' : my_string });
})

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});