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
        tpl   = require('text!tpl/home.html');

    return Backbone.View.extend({
        el: "#content",
        template: _.template(tpl),
        render: function() {
            this.$el.html(tpl);
            return this;
        }
    });

});