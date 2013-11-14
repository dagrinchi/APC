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
        modalTpl = require('text!tpl/modalList.html'),
        listItemTpl = require('text!tpl/listItem.html'),
        bootstrap = require('bootstrap/bootstrap');

    var listItemView = Backbone.View.extend({
        tagName: 'div',
        className: '',
        template: _.template(listItemTpl),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var listEl = Backbone.View.extend({
        render: function() {
            this.collection.each(function(m) {
                var itemView = new listItemView({
                    model: m
                });
                this.$el.append(itemView.render().el);
            }, this);
            return this;
        }
    });

    var modalList = Backbone.View.extend({

        el: "#modalList",

        initialize: function() {
            var self = this;
            $("#modalLabel").html(self.options.title);
            $("#modalBody").html(self.options.list);
        },

        render: function() {
            $(this.el).modal('show');
            return this;
        }
    });

    return Backbone.View.extend({
        el: "body",

        template: _.template(tpl),

        initialize: function() {
            google.maps.event.addListener(APC.views.mapDemanda.map, 'center_changed', function() {
                APC.views.mapCooperacion.map.setCenter(APC.views.mapDemanda.map.getCenter());
            });
            google.maps.event.addListener(APC.views.mapDemanda.map, 'zoom_changed', function() {
                APC.views.mapCooperacion.map.setZoom(APC.views.mapDemanda.map.getZoom());
            });
        },

        events: {
            "click #btnDemActores": "btnDemActores",
            "click #btnDemTerritorios": "btnDemTerritorios",
            "click #btnDemMunicipios": "btnDemMunicipios",
            "click #btnDemAreas": "btnDemAreas",
            "click #btnDemSectores": "btnDemSectores",
            "click #btnProTerritorios": "btnProTerritorios",
            "click #btnProAreas": "btnProAreas"
        },

        btnDemActores: function() {
            APC.views.demActoresListView = new listEl({
                collection: APC.collections.demActoresCollection
            });
            APC.views.demActoresListView.render();

            var modal = new modalList({
                id: "demActores",
                title: "Cooperantes",
                list: APC.views.demActoresListView.el
            });
            modal.render();
        },

        btnDemTerritorios: function() {
            APC.views.demTerritoriosListView = new listEl({
                collection: APC.collections.demTerritoriosCollection
            });
            APC.views.demTerritoriosListView.render();

            var modal = new modalList({
                id: "demTerritorios",
                title: "Territorios",
                list: APC.views.demTerritoriosListView.el
            });
            modal.render();
        },

        btnDemMunicipios: function() {
            APC.views.demMunicipiosListView = new listEl({
                collection: APC.collections.demMunicipiosCollection
            });
            APC.views.demMunicipiosListView.render();

            var modal = new modalList({
                id: "demMunicipios",
                title: "Municipios",
                list: APC.views.demMunicipiosListView.el
            });
            modal.render();
        },

        btnDemAreas: function() {
            APC.views.demAreasListView = new listEl({
                collection: APC.collections.demAreasCollection
            });
            APC.views.demAreasListView.render();

            var modal = new modalList({
                id: "demAreas",
                title: "Áreas",
                list: APC.views.demAreasListView.el
            });
            modal.render();
        },

        btnDemSectores: function() {
            APC.views.demSectoresListView = new listEl({
                collection: APC.collections.demSectoresCollection
            });
            APC.views.demSectoresListView.render();

            var modal = new modalList({
                id: "demSectores",
                title: "Sectores",
                list: APC.views.demSectoresListView.el
            });
            modal.render();
        },

        btnProTerritorios: function() {
            APC.views.proTerritoriosListView = new listEl({
                collection: APC.collections.proTerritoriosCollection
            });
            APC.views.proTerritoriosListView.render();

            var modal = new modalList({
                title: "Territorios",
                list: APC.views.proTerritoriosListView.el
            });
            modal.render();
        },

        btnProAreas: function() {
            APC.views.proAreasListView = new listEl({
                collection: APC.collections.proAreasCollection
            });
            APC.views.proAreasListView.render();

            var modal = new modalList({
                title: "Áreas",
                list: APC.views.proAreasListView.el
            });
            modal.render();
        },

        render: function() {
            this.$el.html(this.template);
            $("#map-canvas-a").replaceWith(APC.views.mapDemanda.el);
            $("#map-canvas-b").replaceWith(APC.views.mapCooperacion.el);

            var wh = $(window).height() - 152;
            $(".map-canvas").width("100%");
            $(".map-canvas").height(wh / 2);

            google.maps.event.trigger(APC.views.mapDemanda.map, 'resize');
            google.maps.event.trigger(APC.views.mapCooperacion.map, 'resize');

            setTimeout(function() {
                APC.collections.demCollection.initMapMarkersWithDb();
                APC.collections.coopCollection.initMapMarkersWithDb();
            }, 2000);

            this.$el.append(_.template(modalTpl));
            return this;
        }
    });

});