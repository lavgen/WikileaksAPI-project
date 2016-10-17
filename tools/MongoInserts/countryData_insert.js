//get mongoose module
//first ./ is to specify we are using a relative path!!
var mongoose = require('./../../node_modules/mongoose');
var fs = require('fs');
//iterator for countries in countryVar
var count = 0;
//4000 is port no
mongoose.connect('mongodb://localhost:4000/WikileaksAPI');
var leakNames = [
    "Global Intelligence Files",
    "Plusd",
    "Cablegate",
    "Kissinger Cables",
    "Carter Cables2",
    "Afghanistan War Logs",
    "Carter Cables",
    "US Military Equipment in Iraq",
    "Clinton Emails",
    "Syria Files",
    "The Guantanamo Files",
    "Hacking Team",
    "Hacking Team Emails",
    "Sony",
    "Secret Congressional Reports",
    "Sony Documents",
    "US Military Equipment in Afghanistan",
    "DNC Email Archive",
    "Sony Emails",
    "Non-collection Publications"];

//create a variable for mongoose
var db = mongoose.connection;
//if there is error log error
db.on('error',console.error.bind(console,'connection error:'));
//once the connection is established define the schemas
db.once('open',function(){

	console.log("Connected!");
	// for (var i = 0; i < countryVar.length; i++) {
	// 	insertCountry(i);
	// }
	insertCountry(count);
});
//get schema we created for countries as variable
//use ./ to mean that it is a relative path!
var countryTemplate = require('./schema');
//list of countries
var countryVar = require('./../countries');
//model from schema
var Countries = mongoose.model("countries", countryTemplate); 

//function to add countries to db
function insertCountry(num){

		//read the json files (num is the variable to go through all countries)
		var countryfile = fs.readFileSync('../CountryData/' + countryVar[num] + '.json', "utf8");
		//make the binaries into objects - so its readable and has obj methods
		var countriesReadable = JSON.parse(countryfile);
		// console.log(countriesReadable);

		//we are adding country names in object, we defined country to be a string in our schema
		var objToDb = { 
			country : countryVar[num] , 
		};
		//for loop to iterate through leak names array defined up top
		leakNames.forEach ( function( leakname) {
			//I am creating empty arrays for each leak group, bc leakname is number of leakgroups
			//-next value inside leakNames array so val = leakNames[0],leakNames[1] etc..
			objToDb[leakname] = [];
			//for loop to go through each leak group and get the names &links in that group
			for (var i = 0; i < countriesReadable[leakname].length; i++) {
				//leakname spesifies the current leakgroup you are in
				// and i is the name and link array in leaknames
				leakobj = countriesReadable[leakname][i];
				//push each links and names to the leak group, then do it for next leak group...
				objToDb[leakname].push(leakobj);
			};

			// countriesReadable[leakname].forEach( function( leakobj, i ) {
			// // //this loop goes through all the names&links inside each leak group
			// val.name ;
			// val.link;
			// // console.log(val.name);
			// //create an object to push to new array
			// var newObj = {
			// 	name: val.name,
			// 	link: val.link
			// }
			// // 	//push obj to array
			// 	objToDb[leakname].push(leakobj);
			//  });
		});

		var country = new Countries(objToDb);
         //function in save is callback
		country.save(function(err){
				if (err) return console.error(err);

				else{
					console.log("File Saved  " + countryVar[num]);
					// if we are on a country that is in the countryVar , keep incrementing count

					if (count < countryVar.length ) {
						//this is inside callback that only saves second file after first is done
						count++;
						
						insertCountry(count);
					};
				}

		})



}



