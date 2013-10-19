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
        tpl   = require('text!tpl/prioridades.html'),
        bootstrap   = require('bootstrap/bootstrap'),
        MapView     = require('app/views/map');

    return Backbone.View.extend({
        el: "#content",

        initialize: function {
            var self = this;
            var list = new ProyectosView({
                collection: self.collection
            });
            this.page = _.template(proyectosPageTpl, { list : list.render().$el.html() });
        }

        render: function() {
            this.$el.html(this.template);
            return this;
        }
    });

});