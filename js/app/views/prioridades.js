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
        tagName: 'li',
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

    return Backbone.View.extend({
        el: "body",

        template: _.template(tpl),

        initialize: function() {

        },

        events: {
            "click #btnDemActores": "btnDemActores",
            "click #btnDemTerritorios": "btnDemTerritorios",
            "click #btnDemMunicipios": "btnDemMunicipios",
            "click #btnDemAreas": "btnDemAreas",
            "click #btnDemSectores": "btnDemSectores"
        },

        btnDemActores: function() {
            APC.views.demActoresListView = new listEl({
                collection: APC.collections.demActoresCollection
            });
            APC.views.demActoresListView.render();

            var modal = _.template(modalTpl, {
                title: "Actores",
                list: APC.views.demActoresListView.$el.html()
            });
            this.$el.append(modal);
            $('#modalList').modal('show');
        },

        btnDemTerritorios: function() {
            APC.views.demTerritoriosListView = new listEl({
                collection: APC.collections.demTerritoriosCollection
            });
            APC.views.demTerritoriosListView.render();

            var modal = _.template(modalTpl, {
                title: "Territorios",
                list: APC.views.demTerritoriosListView.$el.html()
            });
            this.$el.append(modal);
            $('#modalList').modal('show');
        },

        btnDemMunicipios: function() {
            APC.views.demMunicipiosListView = new listEl({
                collection: APC.collections.demMunicipiosCollection
            });
            APC.views.demMunicipiosListView.render();

            var modal = _.template(modalTpl, {
                title: "Municipios",
                list: APC.views.demMunicipiosListView.$el.html()
            });
            this.$el.append(modal);
            $('#modalList').modal('show');
        },

        btnDemAreas: function() {
            APC.views.demAreasListView = new listEl({
                collection: APC.collections.demAreasCollection
            });
            APC.views.demAreasListView.render();

            var modal = _.template(modalTpl, {
                title: "Áreas",
                list: APC.views.demAreasListView.$el.html()
            });
            this.$el.append(modal);
            $('#modalList').modal('show');
        },

        btnDemSectores: function() {
            APC.views.demSectoresListView = new listEl({
                collection: APC.collections.demSectoresCollection
            });
            APC.views.demSectoresListView.render();

            var modal = _.template(modalTpl, {
                title: "Sectores",
                list: APC.views.demSectoresListView.$el.html()
            });
            this.$el.append(modal);
            $('#modalList').modal('show');
        },

        render: function() {
            this.$el.html(this.template);
            $("#map-canvas-a").replaceWith(APC.views.mapDemanda.el);
            $("#map-canvas-b").replaceWith(APC.views.mapCooperacion.el);

            google.maps.event.trigger(APC.views.mapDemanda.map, 'resize');
            google.maps.event.trigger(APC.views.mapCooperacion.map, 'resize');
            return this;
        }
    });

});