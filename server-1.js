var express = require('express');
var server = express();
var mongoose = require('mongoose');
var fs = require('fs');

// connect this server to the mongod server
// make sure u have the same port number that u used to launch mongod with
// make sure u have the right database name too ( not "test" )
mongoose.connect('mongodb://localhost:5000/WikileaksAPI');

// this sets up the type of templating engine to use ( in this case hogan-express )
// other examples are jade, handlebars, mustache, etc.
server.engine('html', require('hogan-express'));
server.set('views', __dirname + '/views'); // set the folder where the views ( ie. template files ) are in
server.set('view engine', 'html'); 

// what's the default folder for any requests to static files
server.use(express.static(__dirname+'/public'));
//for CORS errors, we are adding these to our header to resolve conflict with security
server.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
// this is an example of how to pass data to a view (template)
// && create a page to respond back with
server.get('/',function(req,res){
	// res.sendFile('map.html');

	res.render('map');
});
//we use get here to avoid CORS
server.get('/geoJson',function(req,res){
	// res.sendFile('index.html');
	var geoJs = fs.readFileSync(__dirname+'/public/Country-Cord-data/countries.geojson');
	var geoJs2 = JSON.parse(geoJs);
	res.send(geoJs2);
	
});

// create the mongoose model ( imported from a separate file )
var exports = require('./tools/models/schema');
var Countries = exports.model;

// handle any api requests
server.get('/api',function(req,res){
	
	var obj = {
		country: req.query.country,
		leakgroup: req.query.leakgroup,
		leaks: []
	}

	
	//if they haven't specified a country show no data
	if( typeof req.query.country == "undefined" ){
		obj = {
			err: "You haven't specified a Country!"
		}
		res.send( obj );
	}
	//if they have specified a country;
	else {
			//if no leak group specified give all data
		Countries.findOne({country:req.query.country},function(err,data){
			
			//if a leak group is specified;
			if( typeof req.query.leakgroup !== "undefined" ){
				//and count is specified
				if( typeof req.query.count !== "undefined" && req.query.count <= data[req.query.leakgroup].length){
					// only push that many to obj.leaks which is i
					//req.query.leakgroup.length=25  , k= 24 25 >= k > 25-count
					var revdata = data[req.query.leakgroup].reverse();
					// console.log(data[req.query.leakgroup].length);
					// console.log(data["Clinton Emails"].length);
					for (var k = 0;  k < req.query.count ; k++ ) {

						//right now, if count is 50, will start from 50th obj and count to beginning
							obj.leaks.push( data[req.query.leakgroup][k] );
							// console.log(data[req.query.leakgroup].length );
							//right now spits out empty array
					}
				//if there is count and count is bigger than arrays length, give back error!
				}else if ( typeof req.query.count !== "undefined" && req.query.count > data[req.query.leakgroup].length){
					
					obj = {
						err: "Your count  (" + req.query.count + ") is bigger than array length (" + data[req.query.leakgroup].length +")" 
					}
					res.send( obj );
				//if there is leakgroup but no count , give back all links in that group
				} else if (typeof req.query.count == "undefined" &&  typeof req.query.leakgroup !== "undefined" ) {
					
					//reverse the order so the most recent one is at top
					var revdata1 = data[req.query.leakgroup].reverse();
					//leaks is reversed data
					obj.leaks= revdata1 ;
		
				}
					
			}
			//if leakgroup isn't specified but count is,show that many links from all leakgroups
			else if(typeof req.query.leakgroup == "undefined" && typeof req.query.count !== "undefined") {
					//this is for the actual array
					//turn leaks to obj -usually array
				    obj.leaks = {};
					//i is the name of property . data[i] is value
					for(i in data){
						//if value is an array
						if(data[i] instanceof Array){
							//leaks[i] is property name (All leakgroups are arrays)
							//they all together spit back objects
							obj.leaks[i] = []; 
							// console.log(req.query.leakgroup);
							var Actualcount = (req.query.count > data[i].length) ? data[i].length : req.query.count  ;
							for (var l = 0; l < Actualcount; l++) {
									obj.leaks[i].push( data[i][l] );
							};
						}
					}

			}
			else{ 
			//if leakgroup isn't specified,show all data
			//leaks is an object here as well, inserted with arrays of leakgroups
				obj.leaks = {};
				for( i in data ){ //this is a loop to loop only arrays in our document
					if( data[i] instanceof Array ){
						//data is ordered in leakgroups, not dates
						//reverse order of data
						var revv= data[i].reverse();
						obj.leaks[i] = revv;
						// obj.leaks[i].push(revv);
							
						

					}
				}
			}
		
			res.send( obj );

		});
	} 
		

});


// listen for requests on a specified port
server.listen( 4000, function(err){
	if(err) console.log(err);
	else console.log('Running server on port 4000');
});






