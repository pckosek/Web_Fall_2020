#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
var hbs = require('hbs');

// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', 80 );
app.set('view engine', 'hbs')
app.use(express.static('static'));

// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){
    
    /// ...
    res.render( 'index' );
});

function somethingThatTakesTime(req,res,next) {
    setTimeout( function() {
        next();
    }, 4000)
}

app.get('/mid', somethingThatTakesTime, function(req,res){
    res.render('example', { 'u_name' : 'Paul'});
})

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});