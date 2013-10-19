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
		
		id: '',
		
		defaults: {

		},
		
		initialize: function() {
			var self = this;			
			var mapOptions = this.model.get('mapOptions');
			this.model.set('map', new google.maps.Map(this.el, mapOptions));
		},

		render: function() {			
			return this;
		}
	});

});