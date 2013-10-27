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
        model = require('app/models/proyectos');

    var $ = require('jquery'),
        deferred = $.Deferred();

    return Backbone.Collection.extend({
        model: model,

        initialize: function() {

        },

        findByName: function(key, callback) {

            
            this.db.transaction(
                function(tx) {

                    var sql = "SELECT e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " +
                        "FROM employee e LEFT JOIN employee r ON r.managerId = e.id " +
                        "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                        "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                    tx.executeSql(sql, ['%' + key + '%'], function(tx, results) {
                        var len = results.rows.length,
                            employees = [],
                            i = 0;
                        for (; i < len; i = i + 1) {
                            employees[i] = results.rows.item(i);
                        }
                        callback(employees);
                    });
                },
                function(tx, error) {
                    alert("Transaction Error: " + error);
                }
            );
        },

        findAll: function() {
            var baseapc = new DB(window.openDatabase("apc", "1.0", "APC - Agencia Presidencial de la Cooperación en Colombia", 4145728));
            var self = this;
            baseapc.execute("SELECT DISTINCT demanda.codigoproyecto, demanda.proyectoprograma FROM demanda", model, function(data) {
                self.reset(data);
                deferred.resolve();
            });

            return deferred.promise();
        }
    });

});