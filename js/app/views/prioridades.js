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
        tpl = require('text!tpl/prioridades.html'),
        bootstrap = require('bootstrap/bootstrap');

    return Backbone.View.extend({
        el: "#content",

        template: _.template(tpl),

        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template);
            $("#map-canvas-a").replaceWith(APC.views.mapDemanda.el);
            $("#map-canvas-b").replaceWith(APC.views.mapCooperacion.el);

            google.maps.event.trigger(APC.views.mapDemanda.map,'resize');
            google.maps.event.trigger(APC.views.mapCooperacion.map,'resize');
            return this;
        }
    });

});