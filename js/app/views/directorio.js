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
		directorioItemTpl = require('text!tpl/directorioItem.html'),
		directorioPageTpl = require('text!tpl/directorioPage.html');

	var DirectorioItemView = Backbone.View.extend({
		tagName: 'li',
		className: 'topcoat-list__item',
		template: _.template(directorioItemTpl),
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var DirectorioListView = Backbone.View.extend({
		render: function() {
			this.collection.each(function(m) {
				var directorioItemView = new DirectorioItemView({
					model: m
				});
				this.$el.append(directorioItemView.render().el);
			}, this);
			return this;
		}
	});

	return Backbone.View.extend({
		el: "body",
		initialize: function() {
			var self = this;
			var list = new DirectorioListView({
				collection: self.collection
			});
			this.page = _.template(directorioPageTpl, { list : list.render().$el.html() });
		},
		render: function() {
			this.$el.html(this.page);			
			return this;
		}
	});
});