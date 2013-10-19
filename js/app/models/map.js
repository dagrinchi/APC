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

	var Backbone = require('backbone');

	return Backbone.Model.extend({

		defaults: {
			zoom: 3,
			maxZoom: 18,
			minZoom: 8,
			center: {
				coords: {
					latitude: 4.8,
					longitude: -74
				}
			}
		},

		initialize: function() {
			console.log("googleMaps: Cargando librería maps!");
			google.load("maps", "3", {
				"other_params": "sensor=false",
				callback: function() {					
					APC.models.mapDemanda.initMap();
				}
			});
		},

		initMap: function() {			
			var center = this.get('center');
			var mapOptions = {
				zoom: this.get('zoom'),
				minZoom: this.get('minZoom'),
				maxZoom: this.get('maxZoom'),
				center: new google.maps.LatLng(center.coords.latitude, center.coords.longitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false
			};			

			this.set("mapOptions", mapOptions);
		}
	});

});