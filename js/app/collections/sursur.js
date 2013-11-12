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
        model = require('app/models/sursur');

    var $ = require('jquery'),
        deferred = $.Deferred(),
        geoDeferred = $.Deferred();

    return Backbone.Collection.extend({

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

            var self = this;
            this.baseapc.execute("select pais, group_concat(programaproyectoactividad,' +++ ') as contenido from sursur where pais like '%C%' group by pais", model, function(data) {
                self.reset(data);
                deferred.resolve();
            });

            return deferred.promise();
        },

        initMapMarkers: function() {
            var self = this;
            this.geoCoder().done(function() {
                APC.views.mapSursur.map.fitBounds(self.bounds);
            });
        },

        geoCoder: function() {
            var search = this.models[this.nextAddress].get("pais");
            var windowContent = this.models[this.nextAddress].get("contenido");
            var pais = this.models[this.nextAddress].get("pais");
            
            //console.log(search + " >>> " + this.length + " >>>> " + this.nextAddress + "--" + windowContent);
            if (this.nextAddress < this.length - 1) {
                setTimeout("APC.collections.sursurCollection.getAddress('" + search + "','" + windowContent + "','" + pais + "')", this.delay);
                this.nextAddress++;
            } else {
                geoDeferred.resolve();
            }
            return geoDeferred.promise();
        },

        getAddress: function(search, winContent, pais) {
            var self = this;
            this.geo.geocode({
                address: search
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var p = results[0].geometry.location;
                    var lat = p.lat();
                    var lng = p.lng();
                    self.createMarker(winContent, lat, lng, pais);
                    //console.log('address=' + search + ' lat=' + lat + ' lng=' + lng + '(delay=' + self.delay + 'ms)');
                    self.delay = 100;
                } else {
                    if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                        self.nextAddress--;
                        self.delay++;
                    } else {
                        var reason = "Code " + status;
                        //console.error('address="' + search + '" error=' + reason + '(delay=' + self.delay + 'ms)');
                    }
                }
                self.geoCoder();
            });
        },

        createMarker: function(add, lat, lng, pais) {
            var self = this;
            var contentString = add;
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: APC.views.mapSursur.map,
                zIndex: Math.round(4.5 * -100000) << 5,
                icon: "img/sursur/"+ pais +".png",
                animation: google.maps.Animation.DROP
            });

            google.maps.event.addListener(marker, 'click', function() {
                self.infowindow.setContent(contentString);
                self.infowindow.open(APC.views.mapSursur.map, marker);
            });

            this.bounds.extend(marker.position);
        }


    });

});