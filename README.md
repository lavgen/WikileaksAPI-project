#DOCUMENTATION#

This is the WikileaksAPI. You can query data Wikileaks has for countries. This data consists of links and name of the link divided according to the group that leaked that link. Each country consists of 20 leakgroups and those leak groups consist links and names.   

##To Begin##
                   
**You can't use this API without specifying a country.**               

**Specify a country name :**

country= ‘country name’ ex: country=Turkey

**Specify a leak group :**  (below the page are all leakgroups you can choose from)
*If you don't specify a leakgroup you will get all the data from all leakgroups*

leakgroup= ‘leakgroup name’ ex: leakgroup=Global Intelligence Files

**Specify how many links to get back (count) :**
*if you don't specify count you will get 50 links under that leakgroup*
           
count= ‘number’ ex:count=15

**full example of all queries together: “ url/api?country=Turkey&leakgroup=Global Intelligence Files&count=20 ”**


###Example of What You Can Do With This API:###
  [WikileaksData_Map](http://wiki.lalavgen.com).

**If you only specify a country, you will get all data that all leakgroups have on a country**                
**If you don't specify a leakgroup but only country and count, you will get that number of links from first leakgroup which is "Global Intelligence Files"**     
**If you don't specify count but a leakgroup, you will get back first all links by default**            
              

You can query all the data on one country, or specify the leakgroup that leaked the spesific files in a country. 
There are 20 leak groups you can choose.       
 These are:           
1."Global Intelligence Files",              
2."Plusd",         
3."Cablegate",            
4."Kissinger Cables",        
5."Carter Cables2",             
6."Afghanistan War Logs" ,                  
7."Carter Cables",                
8."US Military Equipment in Iraq",           
9."Clinton Emails", 10."Syria Files",              
11."The Guantanamo Files",             
12."Hacking Team",                      
13."Hacking Team Emails",                
14."Sony",                  
15."Secret Congressional Reports",           
16."Sony Documents",           
17."US Military Equipment in Afghanistan",             
18."DNC Email Archive",          
19."Sony Emails",           
20."Non-collection Publications"          


###Attributions###

geoJson file used on Example Website is taken from : https://github.com/datasets/geo-countries
I am using [Leaflet library](http://leafletjs.com/) and [Open street Map](https://www.openstreetmap.org/#map=5/51.500/-0.100) for creating the map on Example Website.
All data you can view is scraped from https://wikileaks.org/ 


