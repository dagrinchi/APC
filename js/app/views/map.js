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
		defaults: {
			region: 'co',
			language: 'es'
		},
		id: '',
		className: '',
		initialize: function() {			
			this.model.set('map', new google.maps.Map(this.el, this.model.get('mapOptions')));
		},
		render: function() {
			console.log('init map');
			$('#' + this.id).replaceWith(this.el);
			return this;
		}
	});

});