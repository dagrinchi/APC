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
        model = require('app/models/demanda');

    var $ = require('jquery');

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
            this.baseapc.execute("select * from demanda limit 50", model, function(data) {
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
                        self.createMarker(v1.get("RowKey"), v1.get("proyectoprograma").trim(), parseFloat(v3.get("lat")), parseFloat(v3.get("long")));
                    });
                });
            });

            require(['markerclustererCompiled'], function() {
                var markerCluster = new MarkerClusterer(APC.views.mapDemanda.map, self.markers, {
                    maxZoom: 11,
                    gridSize: 50
                });
                APC.views.mapDemanda.map.fitBounds(self.bounds);
            });
        },

        initMapMarkersWithGeo: function() {
            var self = this;
            this.geoCoder().done(function() {
                APC.views.mapDemanda.map.fitBounds(self.bounds);
            });
        },

        geoCoder: function() {
            var geoDeferred = $.Deferred();

            var search = this.models[this.nextAddress].get("municipio");
            if (this.nextAddress < this.length - 1) {
                setTimeout("APC.collections.demCollection.getAddress('" + search + "')", this.delay);
                this.nextAddress++;
            } else {
                geoDeferred.resolve();
            }
            return geoDeferred.promise();
        },

        getAddress: function(search) {
            var self = this;
            this.geo.geocode({
                address: search
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var p = results[0].geometry.location;
                    var lat = p.lat();
                    var lng = p.lng();
                    self.createMarker(search, lat, lng);
                    self.delay = 100;
                } else {
                    if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                        self.nextAddress--;
                        self.delay++;
                    } else {
                        var reason = "Code " + status;
                        console.error('address="' + search + '" error=' + reason + '(delay=' + self.delay + 'ms)');
                    }
                }
                self.geoCoder();
            });
        },

        createMarker: function(RowKey, add, lat, lng) {
            var self = this;
            var contentString = '<a href="#proyectos/' + RowKey + '">' + add + '</a>';
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: APC.views.mapDemanda.map,
                zIndex: Math.round(4.5 * -100000) << 5
            });

            this.markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
                self.infowindow.setContent(contentString);
                self.infowindow.open(APC.views.mapDemanda.map, marker);
            });

            this.bounds.extend(marker.position);
        }

    });

});