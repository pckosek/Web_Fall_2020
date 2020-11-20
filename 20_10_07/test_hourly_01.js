
// AT THE TOP OF YOUR FILE
var  https = require('https');


// ULTIMATELY EMBED IN AN ENDPOINT
// var url = 'https://www.amazon.com'
var url = 'https://api.weather.gov/gridpoints/BUF/35,47/forecast/hourly'
var options =  { headers : {
		'User-Agent': 'request'
	}
}

var temperature = null;

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
        var obj = JSON.parse(rawData);
        //console.log( obj.properties.periods[0].temperature )
        temperature=  obj.properties.periods[0].temperature;


        
        // return temperature;
      }
    );
  }
).on('error', function(e) {
    console.error(e);
});

console.log(temperature)