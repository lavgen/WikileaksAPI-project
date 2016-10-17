var express = require('express');
var server = express();
var mongoose = require('mongoose');

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

// this is an example of how to pass data to a view (template)
// && create a page to respond back with
server.get('/',function(req,res){
	// res.sendFile('index.html');
	var data =  { 
		title:"my page", 
		info:"welcome everyone!" 
	};

	res.render('welcome',data);
});

// create the mongoose model ( imported from a separate file )
var Countries = require('./tools/models/schema');

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
				//only send back that leakgroup data
				obj.leaks = data[req.query.leakgroup];
			}// if leak group isn't specified
			else {
				for( i in data ){ //this is a loop to loop only arrays in our document
					if( data[i] instanceof Array ){

						obj.leaks.push(data[i]);
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






