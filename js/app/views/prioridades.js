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

    var $           = require('jquery'),
        Backbone    = require('backbone'),        
        prioridadesTpl   = require('text!tpl/prioridades.html'),
        bootstrap   = require('bootstrap/bootstrap');

    return Backbone.View.extend({
        el: "#content",
        template: _.template(prioridadesTpl),

        map_a: function() {
            
        },

        map_b: function() {

        },

        render: function() {
            this.map_a();
            this.map_b();

            this.$el.html(prioridadesTpl);
            return this;
        }
    });

});