//get mongoose
var mongoose = require('./../../node_modules/mongoose');

var countryTemplate = mongoose.Schema({
	country : String,
	
	"Global Intelligence Files": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Plusd": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Cablegate": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Kissinger Cables": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Carter Cables2": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Afghanistan War Logs": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Carter Cables": [
		{
			 name: String , 
			 link : String 
		}
	],
	"US Military Equipment in Iraq": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Clinton Emails": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Syria Files": [
		{
			 name: String , 
			 link : String 
		}
	],
	"The Guantanamo Files": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Hacking Team": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Hacking Team Emails": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Sony": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Secret Congressional Reports": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Sony Documents": [
		{
			 name: String , 
			 link : String 
		}
	],
	"US Military Equipment in Afghanistan": [
		{
			 name: String , 
			 link : String 
		}
	],
	"DNC Email Archive": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Sony Emails": [
		{
			 name: String , 
			 link : String 
		}
	],
	"Non-collection Publications": [
		{
			 name: String , 
			 link : String 
		}
	]

      
});
//name of variable

exports.model = mongoose.model('Countries',countryTemplate);
exports.template = countryTemplate;
console.log(exports.model)