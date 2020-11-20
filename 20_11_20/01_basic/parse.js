var fs = require('fs');

var fdata = fs.readFileSync('./county_adjacency.csv').toString();
var lines = fdata.split('\n');

var adjacency = {};
var current_key  = null;

lines.forEach(function(elem,indx){
	var row_array = elem.split(',');
	var locality = Number(row_array[0].replace('\r','')).toString().padStart(5,0);
	var neighbor = Number(row_array[1].replace('\r','')).toString().padStart(5,0);
	if ( locality !== '00000') {
		current_key = locality
		adjacency[current_key] = [];
	}
	if (neighbor !== locality) {
		adjacency[current_key].push( neighbor);
	}
})
// console.log(adjacency)
fs.writeFileSync('fipsAdjacency.json',JSON.stringify(adjacency));

// console.log(fdata.length);