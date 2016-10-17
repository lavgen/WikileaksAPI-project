DOCUMENTATION

This is the WikileaksAPI. You can query data Wikileaks has on countries. The data is links to actual files and name of that file.
You can query all the data on one country, or specify the leakgroup that leaked the spesific files in a country.
 There are 20 leak groups you can choose. These are: 
	1.	       "Global Intelligence Files",
	2.	       "Plusd",
	3.	       "Cablegate",
	4.	       "Kissinger Cables",
	5.	       "Carter Cables2",
	6.	       "Afghanistan War Logs",
	7.	       "Carter Cables",
	8.	       "US Military Equipment in Iraq",
	9.	       "Clinton Emails",
	10.	"Syria Files",
	11.	       "The Guantanamo Files",
	12.	"Hacking Team",
	13.	"Hacking Team Emails",
	14.	"Sony",
	15.	"Secret Congressional Reports",
	16.	"Sony Documents",
	17.	"US Military Equipment in Afghanistan",
	18.	"DNC Email Archive",
	19.	"Sony Emails",
	20.	"Non-collection Publications"

To begin: 
You have to specify a country name, or else you won’t get any data back.

Specify a country name :
		country= ‘country name’		ex: country=Turkey 

Specify a leak group :
		leakgroup= ‘leakgroup name’	ex: leakgroup=Global Intelligence Files

Specify how many links to get back : (by default its 20 links)
		count= ‘number’				ex:count=15

full example: “ url/api?country=Turkey&leakgroup=Global Intelligence Files&count=20 ”
