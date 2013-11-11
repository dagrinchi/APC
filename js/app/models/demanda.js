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

	var Backbone = require('backbone'),
		$ = require('jquery'),
		DB = require('app/utils/db');

	var latLonModel = Backbone.Model.extend({

	});

	var latLonCollection = Backbone.Collection.extend({

	});

	return Backbone.Model.extend({

		baseapc: {},

		latLon: [],

		initialize: function() {
			this.baseapc = new DB(window.openDatabase("apc", "1.0", "APC - Agencia Presidencial de la Cooperación en Colombia", 4145728));
		},

		constructor: function() {
			Backbone.Model.apply(this, arguments);
			this.latLon = [];
			var self = this;

			var territoriosData = this.get("territorio").split(";");
			var municipiosData = this.get("municipio").split(";");

			$.each(territoriosData, function(k1, v1) {
				$.each(municipiosData, function(k2, v2) {
					self.findLatLon(v1.trim(), v2.trim());
				});
			});
		},

		findLatLon: function(territorio, municipio, cb) {
			var latLonCol = new latLonCollection();
			var sql = "SELECT * FROM dane";
			var self = this;
			if (municipio === "") {
				sql += " WHERE nomdep LIKE '%" + territorio + "%'";
			} else {
				sql += " WHERE nommun LIKE '" + municipio + "' AND nomdep LIKE '%" + territorio + "%'";
			}

			this.baseapc.execute(sql, latLonModel, function(data) {
				if (data.length > 0) {
					latLonCol.reset(data);
					self.latLon.push(latLonCol);
				}
			});
		}
	});

});