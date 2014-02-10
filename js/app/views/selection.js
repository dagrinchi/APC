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
		_ = require('underscore');

	var badgeView = Backbone.View.extend({

		tagName : "li",

		className : "badge",

		template : _.template(require('text!tpl/selection.html')),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

			if (this.options.table === "demanda") {
				this.$el.addClass("badge-warning");
			} else if (this.options.table === "dci") {
				this.$el.addClass("badge-success");
			}

			return this;
		}

	});

	return Backbone.View.extend({

		tagName : "ul",

		className : "selectionList",

		render: function() {
			var self = this;
			this.collection.each(function(m) {
                var badge = new badgeView({
                    model: m,
                    table: self.options.table
                });
                this.$el.append(badge.render().el);
            }, this);
            return this;	
		}

	});

});