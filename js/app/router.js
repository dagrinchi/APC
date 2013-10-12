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
        InitDB      = require('app/utils/init'),
        IntroView   = require('app/views/Intro');
        
    var ProyectosCollection = require('app/collections/proyectos');

    return Backbone.Router.extend({

        routes: {
            "": "intro",
            "prioridadesdecooperacion": "prioridades",
            "cooperacionsursur": "sursur",            
            "proyectos": "proyectos",
            "directorio": "directorio",
            "ejecutasproyectos": "ejecutas",
            "acercade": "acercade"
        },

        initialize: function(){
            
        },

        intro: function() {
            var self = this;
            this.introView = new IntroView();
            this.introView.render();

            var initdb = new InitDB();
            $.when(initdb).done(function() {
                setTimeout(function() {
                    //self.navigate("map", { trigger: true });
                }, 2000);
            });            
        },

        home: function() {            
            
        },

        prioridades: function() {

        },

        sursur: function() {

        },

        proyectos: function() {
            var collection = new ProyectosCollection();            
        },

        directorio: function() {

        },

        ejecutas: function() {

        },

        acercade: function() {

        }

    });

});