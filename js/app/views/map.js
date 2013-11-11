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

		map: {},

		initialize: function() {
			var self = this;

			require(['async!http://maps.googleapis.com/maps/api/js?key=AIzaSyCtA2EQoKD1VLTpg1De7-smoxI2o1YygBo&sensor=true&amp;language=es'], function() {

				var mapOptions = {
					zoom: self.options.zoom,
					minZoom: self.options.minZoom,
					maxZoom: self.options.maxZoom,
					center: new google.maps.LatLng(self.options.latitude, self.options.longitude),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					mapTypeControl: false,
					styles: self.options.styles
				};
				self.map = new google.maps.Map(self.el, mapOptions);
			});
		},

		render: function() {
			return this;
		}
	});

});