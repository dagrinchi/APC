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
        Backbone = require('backbone');

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

        initialize: function() {
            var self = this;
            require(['app/views/header', 'app/views/footer'], function(headerView, footerView) {
                self.HeaderView = new headerView();
                self.FooterView = new footerView();
            });
        },

        intro: function() {
            var self = this;
            require(['app/utils/init', 'app/views/intro'], function(Initdb, IntroView) {

                self.introView = new IntroView();
                self.introView.render();

                var initdb = new Initdb();
                $.when(initdb).done(function() {
                    setTimeout(function() {
                        self.navigate("inicio", {
                            trigger: true
                        });
                    }, 2000);
                });
            });

            return this;
        },

        inicio: function() {
            var self = this;
            require(['app/views/home'], function(HomeView) {
                self.homeView = new HomeView();
                self.homeView.render();

                self.HeaderView.remove();
                self.FooterView.remove();
            });
        },

        prioridades: function() {
            var self = this;
            require(['app/collections/demanda', 'app/collections/cooperacion', 'app/views/prioridades', 'app/models/map', 'app/views/map'], function(DemandaCollection, CooperacionCollection, PrioridadesPage, Map, MapView) {
                var demCollection = new DemandaCollection();
                var coopCollection = new CooperacionCollection();
                $.when(demCollection.findAll(), coopCollection.findAll()).done(function() {

                    self.HeaderView.render();
                    self.FooterView.remove();

                    var mapDemanda = new Map({
                        zoom: 8,
                        maxZoom: 18,
                        minZoom: 8,
                        position: {
                            coords: {
                                latitude: -34.397,
                                longitude: 150.644
                            }
                        }
                    });
                    // var mapDemandaView = new MapView({
                    //     id: "map-canvas-a",
                    //     className: "map-canvas-a",
                    //     model: mapDemanda
                    // });
                    // mapDemandaView.render();

                    // var mapCooperacion = new Map({
                    //     zoom: 8,
                    //     maxZoom: 18,
                    //     minZoom: 8
                    // });
                    // mapCooperacion.initMap();
                    // var mapCooperacionView = new MapView({
                    //     id: "map-canvas-b",
                    //     className: "map-canvas-b",
                    //     model: mapCooperacion
                    // });
                    // mapCooperacionView.render();

                    var prioridadesPage = new PrioridadesPage({
                        demcollection: demCollection,
                        coopcollection: coopCollection
                    });
                    prioridadesPage.render();
                });
            });
        },

        sursur: function() {

        },

        proyectos: function() {
            var self = this;
            require(['app/collections/proyectos', 'app/views/proyectos'], function(ProyectosCollection, ProyectosPage) {
                self.HeaderView.render();
                self.FooterView.render();

                var proCollection = new ProyectosCollection();
                $.when(proCollection.findAll()).done(function() {
                    var ProyectosPageView = new ProyectosPage({
                        collection: proCollection
                    });
                    ProyectosPageView.render();
                });
            });
        },

        directorio: function() {

        },

        ejecutas: function() {

        },

        acercade: function() {

        }

    });

});