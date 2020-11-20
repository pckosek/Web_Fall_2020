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
app.set('port', 3000 );

app.set('view engine', 'hbs');

// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages


function getWeatherLatLong(req,res,next) {

	var url = 'https://api.weather.gov/points/42.9356,-78.8692'
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
	        console.log('downloaded first')
	        var obj = JSON.parse(rawData);
	        res.locals.forecasturl = obj.properties.forecast
        	next()

	      }
	    );
	  }
	).on('error', function(e) {
	    console.error(e);
	});

}

function getWeatherForecast(req,res,next) {

	var url = res.locals.forecasturl;
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
	        console.log('downloaded second')
	        var obj = JSON.parse(rawData);
	        temperature=  obj.properties.periods[0].temperature;
        	res.send('The temperature is: ' + temperature)

	      }
	    );
	  }
	).on('error', function(e) {
	    console.error(e);
	});

}


app.get('/', getWeatherLatLong, getWeatherForecast);




// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});