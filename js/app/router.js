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
            require(['app/views/header', 'app/views/footer', 'app/views/map'], function(headerView, footerView, MapView) {

                if (typeof APC.views.mapDemanda === 'undefined')
                    APC.views.mapDemanda = new MapView({
                        id : "#map-canvas-a",
                        className : "map-canvas"
                    });

                if (typeof APC.views.mapCooperacion === 'undefined')
                    APC.views.mapCooperacion = new MapView({
                        id : "#map-canvas-b",
                        className : "map-canvas"
                    });

                APC.views.HeaderView = new headerView();
                APC.views.FooterView = new footerView();
            });
        },

        intro: function() {
            require(['app/utils/init', 'app/views/intro'], function(Initdb, IntroView) {

                APC.views.introView = new IntroView();
                APC.views.introView.render();

                APC.utils.initdb = new Initdb();
                $.when(APC.utils.initdb).done(function() {
                    setTimeout(function() {
                        APC.router.navigate("inicio", {
                            trigger: true
                        });
                    }, 2000);
                });
            });

            return this;
        },

        inicio: function() {
            require(['app/views/home'], function(HomeView) {
                if (typeof APC.views.homeView === 'undefined') {
                    APC.views.homeView = new HomeView();
                }
                APC.views.homeView.render();
            });

            APC.views.HeaderView.remove();
            APC.views.FooterView.remove();
        },

        prioridades: function() {
            require([
                'app/collections/demanda',
                'app/collections/demActores',
                'app/collections/demTerritorios',
                'app/collections/demMunicipios',
                'app/collections/demAreas',
                'app/collections/demSectores',
                'app/collections/cooperacion',
                'app/views/prioridades'
            ], function(
                DemandaCollection,
                DemActoresCollection,
                DemTerritoriosCollection,
                DemMunicipiosCollection,
                DemAreasCollection,
                DemSectoresCollection,
                CooperacionCollection,
                PrioridadesPageView) {

                if (typeof APC.collections.demCollection === 'undefined')
                    APC.collections.demCollection = new DemandaCollection();

                if (typeof APC.collections.demActoresCollection === 'undefined')
                    APC.collections.demActoresCollection = new DemActoresCollection();
                if (typeof APC.collections.demTerritoriosCollection === 'undefined')
                    APC.collections.demTerritoriosCollection = new DemTerritoriosCollection();                
                if (typeof APC.collections.demMunicipiosCollection === 'undefined')
                    APC.collections.demMunicipiosCollection = new DemMunicipiosCollection();
                if (typeof APC.collections.demAreasCollection === 'undefined')
                    APC.collections.demAreasCollection = new DemAreasCollection();
                if (typeof APC.collections.demSectoresCollection === 'undefined')
                    APC.collections.demSectoresCollection = new DemSectoresCollection();

                if (typeof APC.collections.coopCollection === 'undefined')
                    APC.collections.coopCollection = new CooperacionCollection();

                $.when(APC.collections.demCollection.findAll(),
                    APC.collections.coopCollection.findAll(),
                    APC.collections.demActoresCollection.findAll(),
                    APC.collections.demTerritoriosCollection.findAll(),
                    APC.collections.demMunicipiosCollection.findAll(),
                    APC.collections.demAreasCollection.findAll(),
                    APC.collections.demSectoresCollection.findAll()).done(function() {
                        
                    APC.views.HeaderView.render();
                    APC.views.FooterView.remove();                    

                    APC.views.prioridadesPageView = new PrioridadesPageView();
                    APC.views.prioridadesPageView.render();
                });

            });
        },

        sursur: function() {

        },

        proyectos: function() {
            require(['app/collections/proyectos', 'app/views/proyectos'], function(ProyectosCollection, ProyectosPageView) {
                APC.views.HeaderView.render();
                APC.views.FooterView.render();

                if (typeof APC.collections.proCollection === 'undefined')
                    APC.collections.proCollection = new ProyectosCollection();
                $.when(APC.collections.proCollection.findAll()).done(function() {
                    APC.views.ProyectosPageView = new ProyectosPageView({
                        collection: APC.collections.proCollection
                    });
                    APC.views.ProyectosPageView.render();
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