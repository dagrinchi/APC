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
    	DB 	= require('app/utils/db'),
    	model = require('app/models/proyectos'),
        ProyectosPage = require('app/views/proyectos');

    return Backbone.Collection.extend({	
		model: model,

		initialize: function() {            
            var baseapc = new DB(window.openDatabase("apc", "1.0", "APC - Agencia Presidencial de la Cooperación en Colombia", 4145728));
            var self = this;
            baseapc.execute("SELECT DISTINCT demanda.codigoproyecto, demanda.proyectoprograma FROM demanda", model, function(dataCollection) {
            	self.reset(dataCollection);
                var view = new ProyectosPage({ collection: self });                
                view.render();
            });
		}
	});

});