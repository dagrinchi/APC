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
		Backbone = require('backbone'),
		_ = require('underscore'),
		proyectoTpl = require('text!tpl/proyecto.html'),
		proyectosPageTpl = require('text!tpl/proyectos_page.html');

	var ProyectoView = Backbone.View.extend({
		tagName: 'li',
		className: 'media',
		template: _.template(proyectoTpl),
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var ProyectosSearchView = Backbone.View.extend({
		el: "#searchPage",
		initialize: function() {
			
		},
		render: function(eventName) {
			
		},
		events: {
			"keyup .search-key": "search"
		},
		search: function(event) {
			var key = $('.search-key').val();
			this.collection.findByName(key);
		}
	});

	var ProyectosView = Backbone.View.extend({
		tagName: "ul",
		className: 'media-list',
		render: function() {
			this.collection.each(function(proyecto) {
				var proyectoView = new ProyectoView({
					model: proyecto
				});
				this.$el.append(proyectoView.render().el);
			}, this);
			return this;
		}
	});

	return Backbone.View.extend({
		el: "#content",
		template: _.template(proyectosPageTpl),
		initialize: function() {

		},
		render: function() {
			var self = this;
			var list = new ProyectosView({
				collection: self.collection
			});

			this.$el.html(this.template);
			//$("#proyectosList").html(list.render().el);
			return this;
		}
	});
});