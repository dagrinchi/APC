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
			id: '',
			currentLatLng: {},
			mapOptions: {},
			map: {},
			position: {
				coords: {
					latitude: -34.397,
					longitude: 150.644
				}
			},
			zoom: 13,
			maxZoom: 16,
			minZoom: 12
		},
		initMap: function() {			
			var self = this;
			var position = this.get('position');
			console.log(position);	
			var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var mapOptions = {
				zoom: self.get('zoom'),
				minZoom: self.get('minZoom'),
				maxZoom: self.get('maxZoom'),
				center: currentLatLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false
			};
			self.set('mapOptions', mapOptions);
		},
		initialize: function() {
			var self = this;
			var url = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false";
			$.ajax({
				url: url,
				dataType: "script",
				async: false,
				success: function() {
					self.initMap();					
				}
			});
		}
	});

});