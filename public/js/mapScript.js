
//variable for all leaknames, can iterate with this to get the api
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
    "Non-collection Publications"
];

// console.log(leakNames.length);
//loop through an array
// for (var c in leakNames) {
// 	//create new element a tag
//     var newElement = document.createElement('a');
//     //put href in that element 
//     newElement.href =  "http://localhost:4000/api?country=China&leakgroup="+leakNames[c];

//     //create id and class for element
//     newElement.id = leakNames[c]; newElement.className = "leakslayer";
//     //add all leaknames to new element but with linebreak
//     newElement.innerHTML = leakNames[c]+ '<br />';
//     //push elements into demo div
//     document.getElementById('demo').appendChild(newElement );
// }


 	var map = L.map( 'mapid', {
	    center: [20.0, 5.0],
	    minZoom: 2,
	    zoom: 2
	});


	
 	L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
 	{attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	 subdomains: ['a','b','c']
	}).addTo( map );
 	//layers
 	map.createPane('labels');
 	//so that the blue layer is on top 
 	map.getPane('labels').style.zIndex = 650;
 	//to make the countries clickable - for more info search css pointer events
 	map.getPane('labels').style.pointerEvents = 'none';
	var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
	        attribution: '©OpenStreetMap, ©CartoDB'
	}).addTo(map);

	var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
	        attribution: '©OpenStreetMap, ©CartoDB',
	        pane: 'labels'
	}).addTo(map);
	map.scrollWheelZoom.disable();



	//request content of a file
	var req = new XMLHttpRequest();
	//this is with header that has the allow cross origin
	req.open("GET","http://lalavgen.com:4000/geoJson" , true);
	//once page loads do this
	req.addEventListener("load", function(){
		var loadText = document.getElementById('mapload');
		loadText.style.display = "none";
		var data = JSON.parse(req.responseText );
		addDataToMap(data, map);

	});
	req.send(null);

	
	// console.log(nameDict);
	

	//openModal
	function showModal(a){
		var leaklayer = document.getElementById('leaklayer');
		//when modal is first created show loading text
		leaklayer.innerHTML = "loading";
		//get id of a tag which is name of the countries
		var name = a.getAttribute('id');
		//convert name in tag to name inside database through nameDict module
		//we are doing this so every country name in geojson is same with country names in database
		// assign rightName property of selected country as name when querying with api url
		var correctName = nameDict[name].rightName ; 
		// console.log(correctName);
	
		var demo = document.getElementById('demo');
		// console.log(name);
		demo.style.display = "block";
		var countryReq = new XMLHttpRequest();
		countryReq.open("GET","http://wiki.lalavgen.com/api?country="+correctName , true);

		countryReq.addEventListener("load", function(){
			
			var data = JSON.parse(countryReq.responseText );
			//data.leaks is the object with leaks
			//i is the key of the obj
			//get rid of loading text and show leaks
			leaklayer.innerHTML = "";

			for(i in data.leaks){
				//data.leaks is all the lakgroups (i.e Global Int Files,PlusD etc)
				if (data.leaks[i].length > 0 ) {
					//create an a tag for each leakgroup name
					var newElement = document.createElement('a');
					//add index as the link, index is the name (ie Global Intelligence Files)
					newElement.innerHTML = [i] + '<br />';
					//push elements into demo div
					leaklayer.appendChild(newElement );
					//let comes from ES6, 
					let leakName = i;
					//loop through leakgroups
					newElement.onclick = function(){
						document.getElementById('leaks').style.display = "block";
						//get rid of what is inside list div
						document.getElementById('leaksList').innerHTML = "";
						
						// console.log(i , leakName);
						for (var k = 0; k < data.leaks[leakName].length; k++) {
							//deleted every [0] before [k]
							//create a tag for name of links
							var leak = document.createElement('a');
							//add name of link to a title
							leak.innerHTML = data.leaks[leakName][k].name  + '<br />'+ '<br />';
							//add href in db to href of a tag
							leak.href = data.leaks[leakName][k].link ;
							//have them open in new tab
							leak.setAttribute('target','_blank');
							//push elements into leaksList div
							document.getElementById('leaksList').appendChild(leak);

						};
					};
				};
			}

			

		});

		countryReq.send(null);

		

	}
	//closeModal onclick
	document.getElementById('closeModal').onclick = function(){
		
		document.getElementById('demo').style.display = "none";
		document.getElementById('leaks').style.display = "none";
	};

	document.getElementById('closelist').onclick = function(){
		
		document.getElementById('leaks').style.display = "none";
	};
	function addDataToMap(data, map) {
		//assign geojson to data layer, L is an instance of the map
	    var dataLayer = L.geoJson(data);
	    //add geojson to map
	    dataLayer.addTo(map);
	    //on clicking each layer(countries) do something
	    dataLayer.eachLayer(function (layer) {
	    	//this creates the pop up here will the api come
	    	//ADMIN is the name of the country according to geoJSON files
		   var countryName = layer.feature.properties.ADMIN;
		   layer.bindPopup('<a href=#leakslayer id="'+countryName +'" onclick="showModal(this)">'+ countryName +'</a>');
		  

		    // layer.bindPopup('<a href="http://www.google.com">Visit Google</a>"');
		     
		
		});
	}
	

	// var geojson = L.geoJson(GeoJsonData, geoJsonOptions).addTo(map);
	// geojson.eachLayer(function (layer) {
	//     layer.bindPopup(layer.feature.properties.name);
	// });

	// map.fitBounds(geojson.getBounds());

