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
		proyectoTpl = require('text!tpl/proyectosItem.html'),
		proyectosPageTpl = require('text!tpl/proyectosPage.html');

	var ProyectoView = Backbone.View.extend({
		tagName: 'li',
		className: 'topcoat-list__item',
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
			APC.collections.proCollection.findByName(key);
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
		el: "body",
		initialize: function() {
			var self = this;
			var list = new ProyectosView({
				collection: self.collection
			});
			this.page = _.template(proyectosPageTpl, { list : list.render().$el.html() });
		},
		render: function() {
			this.$el.html(this.page);			
			return this;
		}
	});
});