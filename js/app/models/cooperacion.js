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
			this.findLatLon(this.get("terrirorio"));
		},

		findLatLon: function(territorio) {
			var self = this;
			var latLonCol = new latLonCollection();

			var sql = "SELECT * FROM dane WHERE nomdep LIKE '%" + territorio + "%'";			
			this.baseapc.execute(sql, latLonModel, function(data) {
				if (data.length > 0) {
					latLonCol.reset(data);
					self.latLon.push(latLonCol);
				}
			});
		}

    });

});