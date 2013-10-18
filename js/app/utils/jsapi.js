/**
* COOL4CODE
* Authors:
*
* Alejandro Zarate: azarate@cool4code.com,
* Marcos Aguilera: maguilera@cool4code.com,
* Paola Vanegas: pvanegas@cool4code.com,
* David Alméciga: walmeciga@cool4code.com"
*/

define(function(require) {

	"use strict";

	function googleLoad() {
		console.log("googleMaps: Cargando librería maps!");
		google.load("maps", "3");
	}

	return function(cb) {

		console.log("initGoogleLoader: Cargando activos google!");
		var script = document.createElement("script");
		script.src = "https://www.google.com/jsapi?callback=googleLoad" ;
		script.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(script);

		script.addEventListener("error", function(e) {
			console.log("Error: " + e);
		}, false);

		cb();
	};

});