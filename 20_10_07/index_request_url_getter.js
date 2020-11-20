#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express');
var path = require('path');
var hbs = require('hbs');
var  https = require('https');

var app = express();


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM
app.set('port', 80 );

app.set('view engine', 'hbs');

// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages


app.get('/', verifyLatLong, firstfunction , secondRequest);

function verifyLatLong(req,res,next) {
	var has_lat = 'lat' in req.query;
	var has_long = 'long' in req.query;

	if (has_long & has_lat) {
		next()
	} else {
		res.render('missing_long') ; //./views/missing_long.hbs must exist
	}
}

function firstfunction(req,res,next) {
	var url = 'https://api.weather.gov/points/42.9356,-78.8692'; //proxy for req.query.lat
	var options =  { headers : {
			'User-Agent': 'request'
		}
	}

	url_getter(url,options,res,next)

}

function secondRequest(req,res,next){
	var url = res.locals.obj.properties.forecast.hourly;
	var options =  { headers : {
			'User-Agent': 'request'
		}
	}

	https.get(url, options, 
	  function(response) {

	    var rawData = '';

	    response.on('data', 
	      function(chunk) {
	        rawData += chunk;
	      }
	    );

	    response.on('end', 
	      function() {
	        // console.log(rawData);  // THIS IS WHERE YOU HAVE ACCESS TO RAW DATA
	        console.log('downloaded')
	        var obj = JSON.parse(rawData);

	        res.locals.obj = obj;
	        res.send('hi')
	        
	      }
	    );
	  }
	).on('error', function(e) {
	    console.error(e);
	});
}

function url_getter(url, options,res,next) {
	https.get(url, options, 
	  function(response) {

	    var rawData = '';

	    response.on('data', 
	      function(chunk) {
	        rawData += chunk;
	      }
	    );

	    response.on('end', 
	      function() {
	        // console.log(rawData);  // THIS IS WHERE YOU HAVE ACCESS TO RAW DATA
	        console.log('downloaded first')
	        var obj = JSON.parse(rawData);

	        res.locals.obj = obj;
	        next();
	        
	      }
	    );
	  }
	).on('error', function(e) {
	    console.error(e);
	});
}


// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});