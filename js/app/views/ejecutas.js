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
        tpl    = require('text!tpl/ejecutas.html'),
        action = require('action');

    return Backbone.View.extend({
        el: "body",
        template: _.template(tpl),
        render: function() {
            this.$el.html(this.template);
            return this;
        }
    });

});