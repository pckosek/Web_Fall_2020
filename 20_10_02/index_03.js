#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
var hbs = require('hbs');

// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );
app.set('view engine', 'hbs')
app.use(express.static('static'));

// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){
    
    /// ...
    res.render( 'index' );
});

function my_wait_fcn(req,res,next) {
	var delay_ms = req.query.delay_ms;

    setTimeout( function() {
        next();
    }, delay_ms)

}

app.get('/mid', my_wait_fcn, function(req,res){
    res.render('example', { 'u_name' : 'Paul'});
})

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});