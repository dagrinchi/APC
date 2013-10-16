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
        InitDB      = require('app/utils/init');

    var headerView = require('app/views/header'),
        footerView = require('app/views/footer'),
        IntroView   = require('app/views/intro'),
        HomeView    = require('app/views/home');
        
    var ProyectosCollection = require('app/collections/proyectos');

    var HeaderView = new headerView();
    var FooterView = new footerView();
            

    return Backbone.Router.extend({

        routes: {
            "": "intro",
            "inicio": "inicio",
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
            var introView = new IntroView();
            introView.render();

            var initdb = new InitDB();
            $.when(initdb).done(function() {
                setTimeout(function() {
                    self.navigate("inicio", { trigger: true });
                }, 2000);
            });

            return this;
        },

        inicio: function() {            
            var homeView = new HomeView();
            homeView.render();
        },

        prioridades: function() {            
            HeaderView.render();
            FooterView.render();
        },

        sursur: function() {
            HeaderView.render();
            FooterView.render();
        },

        proyectos: function() {
            HeaderView.render();
            FooterView.render();

            var collection = new ProyectosCollection();
        },

        directorio: function() {    
            HeaderView.render();
            FooterView.render();
        },

        ejecutas: function() {
            HeaderView.render();
            FooterView.render();
        },

        acercade: function() {
            HeaderView.render();
            FooterView.render();
        }

    });

});