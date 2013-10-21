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

	var $ = require('jquery'),
		Backbone = require('backbone');

	return Backbone.View.extend({

		tagName: 'div',

		zoom : 5,

		minZoom : 3,

		maxZoom : 18,

		latitude : 4,

		longitude : -74,

		map : {},
		
		initialize: function() {
			var self = this;			

			require(['async!http://maps.googleapis.com/maps/api/js?key=AIzaSyCtA2EQoKD1VLTpg1De7-smoxI2o1YygBo&sensor=true&amp;language=es'], function() {

				var mapOptions = {
					zoom: self.zoom,
					minZoom: self.minZoom,
					maxZoom: self.maxZoom,
					center: new google.maps.LatLng(self.latitude, self.longitude),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					mapTypeControl: false
				};
				self.map = new google.maps.Map(self.el, mapOptions);
			});
		},

		render: function() {			
			return this;
		}
	});

});