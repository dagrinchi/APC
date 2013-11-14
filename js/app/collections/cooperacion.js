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

    var Backbone = require('backbone'),
        DB = require('app/utils/db'),
        model = require('app/models/cooperacion');

    var $ = require('jquery'),
        deferred = $.Deferred();

    return Backbone.Collection.extend({

        markers: [],

        delay: 100,

        nextAddress: 0,

        model: model,

        baseapc: {},

        initialize: function() {
            this.geo = new google.maps.Geocoder();
            this.bounds = new google.maps.LatLngBounds();
            this.infowindow = new google.maps.InfoWindow();
            this.baseapc = new DB(window.openDatabase("apc", "1.0", "APC - Agencia Presidencial de la Cooperación en Colombia", 4145728));
        },

        findAll: function() {
            var deferred = $.Deferred();
            var self = this;
            this.baseapc.execute("SELECT * FROM dci", model, function(data) {
                self.reset(data);
                deferred.resolve();
            });
            return deferred.promise();
        },

        initMapMarkersWithDb: function() {
            var self = this;
            $.each(this.models, function(k1, v1) {
                $.each(v1.latLon, function(k2, v2) {
                    $.each(v2.models, function(k3, v3) {
                        self.createMarker(v1.get("RowKey"), v1.get("componentecooperacion").trim(), parseFloat(v3.get("lat")), parseFloat(v3.get("long")));
                    });
                });
            });

            require(['markerclustererCompiled'], function() {
                var markerCluster = new MarkerClusterer(APC.views.mapCooperacion.map, self.markers, {
                    maxZoom: 11,
                    gridSize: 50
                });
                APC.views.mapCooperacion.map.fitBounds(self.bounds);
            });
        },

        createMarker: function(RowKey, add, lat, lng) {
            var self = this;
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: APC.views.mapCooperacion.map,
                zIndex: Math.round(4.5 * -100000) << 5
            });

            this.markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
                self.infowindow.setContent(add);
                self.infowindow.open(APC.views.mapCooperacion.map, marker);
            });

            this.bounds.extend(marker.position);
        }

    });

});