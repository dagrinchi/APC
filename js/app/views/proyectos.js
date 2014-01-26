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

	var ProyectosView = Backbone.View.extend({
		
		tagName: "ul",
		className: 'topcoat-list__container',
		
		initialize: function() {
			this.collection.bind("reset", this.render, this);
		},
		
		render: function() {
			this.$el.empty();
			var frag = document.createDocumentFragment();
			this.collection.each(function(proyecto) {
				var proyectoView = new ProyectoView({
					model: proyecto
				});
				this.$el.append(frag.appendChild(proyectoView.render().el));
			}, this);
			return this;
		}
	});

	return Backbone.View.extend({

		el: "body",
		
		events: {
			"keyup #search-project": "search",
			"click #demandProyects": "proyectosDemanda",
			"click #southProyects": "proyectosSursur"
		},
		
		search: function(event) {
			var key = $('#search-project').val();
			if (key.length  > 5) {
				this.collection.findByName(key);
			}
		},

		proyectosDemanda: function() {
			$('#search-project').val("");
			this.collection.findAll(1, 10);
		},

		proyectosSursur: function() {
			$('#search-project').val("");
			this.collection.findAllSursur();
		},
		
		render: function() {
			var self = this;
			var list = new ProyectosView({
				collection: self.collection
			});
			this.$el.html(_.template(proyectosPageTpl));
			$("#projectList").html(list.render().el);
			return this;
		}
	});
});