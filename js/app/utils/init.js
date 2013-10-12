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

	var $        = require('jquery'),
	    deferred = $.Deferred();

	var app = {	

		countSur: 0,

		countDci: 0,

		countDirectorio: 0,

		countDemanda: 0,

		dataSur: [],

		dataDci: [],

		dataDirectorio: [],

		dataDemanda: [],

		checkUpdatedData: function() {
			console.log("checkUpdatedData: Comprobando si los datos están actualizados!");
			var s = new Date();
			s.setMonth(s.getMonth() - 3);
			var updated = window.localStorage.getItem("updated");
			var u = new Date(updated);
			if (updated && u > s) {
				console.log("checkUpdatedData: Los datos están actualizados! " + updated);
				return true;
			} else {
				console.log("checkUpdatedData: Los datos no están actualizados!");
				return false;
			}
		},

		loadSur: function() {
			console.log("loadSur: Consultando open data!");
			var url = "http://servicedatosabiertoscolombia.cloudapp.net/v1/APC/sursur?$format=json&$filter=id>" + app.countSur;
			var xhr = app.getJson(url);
			xhr.success(function(r) {
				console.log("loadSur: Descarga completa!");
				$.each(r.d, function(k, v) {
					app.dataSur.push(v);
				});
				if (r.d.length == 1000) {
					app.countSur = app.countSur + 1000;
					app.loadSur();
				} else {
					console.log("loadSur: Se descargaron los datos completos de open data!");
					app.loadDci();
				}
			});
			console.log("loadSur: " + url);
		},

		loadDci: function() {
			console.log("loadDci: Consultando open data!");
			var url = "http://servicedatosabiertoscolombia.cloudapp.net/v1/APC/dci?$format=json&$filter=id>" + app.countDci;
			var xhr = app.getJson(url);
			xhr.success(function(r) {
				$.each(r.d, function(k, v) {
					app.dataDci.push(v);
				});
				if (r.d.length == 1000) {
					app.countDci = app.countDci + 1000;
					app.loadDci();
				} else {
					console.log("loadDci: Se descargaron los datos completos de open data!");
					app.loadDirectorio();
				}
			});
			console.log("loadDci: " + url);
		},

		loadDirectorio: function(cb) {
			console.log("loadDirectorio: Consultando open data!");
			var url = "http://servicedatosabiertoscolombia.cloudapp.net/v1/APC/directorio?$format=json&$filter=id>" + app.countDirectorio;
			var xhr = app.getJson(url);
			xhr.success(function(r) {
				$.each(r.d, function(k, v) {
					app.dataDirectorio.push(v);
				});
				if (r.d.length == 1000) {
					app.countDirectorio = app.countDirectorio + 1000;
					app.loadDirectorio();
				} else {
					console.log("loadDirectorio: Se descargaron los datos completos de open data!");
					app.loadDemanda();
				}
			});
			console.log("load: " + url);
		},

		loadDemanda: function(cb) {
			console.log("loadDemanda: Consultando open data!");
			var url = "http://servicedatosabiertoscolombia.cloudapp.net/v1/APC/demanda?$format=json&$filter=id>" + app.countDemanda;
			var xhr = app.getJson(url);
			xhr.success(function(r) {
				$.each(r.d, function(k, v) {
					app.dataDemanda.push(v);
				});
				if (r.d.length == 1000) {
					app.countDemanda = app.countDemanda + 1000;
					app.loadDemanda();
				} else {
					console.log("loadDemanda: Se descargaron los datos completos de open data!");
					app.createDB();
				}
			});
			console.log("load: " + url);
		},

		getJson: function(url) {
			return $.ajax({
				type: "GET",
				url: url,
				dataType: 'jsonp',
				error: function() {
					console.error("El repositorio de datos Open Data no está disponible ó se ha perdido la conexión con la red!");
					// navigator.notification.alert('El repositorio de datos Open Data no está disponible ó se ha perdido la conexión con la red, inténtalo más tarde!', function() {
					// }, 'Atención', 'Reintentar');
				}
			});
		},

		createDB: function() {
			console.log("createDB: Creando base de datos!");
			var db = window.openDatabase("apc", "1.0", "APC - Agencia Presidencial de la Cooperación en Colombia", 4145728);
			db.transaction(app.populateDB, app.errorDB, app.successDB);
		},

		populateDB: function(tx) {
			console.log("populateDB: Creando tablas!");

			var tables = [{
				name: "sursur",
				fields: [],
				data: "dataSur"
			}, {
				name: "dci",
				fields: [],
				data: "dataDci"
			}, {
				name: "directorio",
				fields: [],
				data: "dataDirectorio"
			}, {
				name: "demanda",
				fields: [],
				data: "dataDemanda"
			}];

			$.each(tables, function(k, v) {
				$.each(app[v.data][0], function(k1, v1) {
					v.fields.push(k1);
				});
			});

			$.each(tables, function(k, v) {
				tx.executeSql('DROP TABLE IF EXISTS ' + v.name);

				console.log("populateDB: Creando tabla " + v.name + "!");
				tx.executeSql('CREATE TABLE IF NOT EXISTS ' + v.name + ' (' + v.fields.join() + ')');

				console.log("populateDB: Insertando registros en la tabla datos " + v.name + "!");
				$.each(app[v.data], function(k1, v1) {
					var values = [];
					$.each(v1, function(k2, v2) {
						values.push('"' + v2 + '"');
					});
					var sql = 'INSERT INTO ' + v.name + ' (' + v.fields.join() + ') VALUES (' + values.join() + ')';
					tx.executeSql(sql);
				});

			});
		},

		successDB: function() {
			console.log("successDB: Base de datos creada con éxito!");
			console.log("successDB: Guardando fecha de actualización!");
			var updated = new Date();
			window.localStorage.setItem("updated", updated);
			$("#date").html("<strong>" + updated + "</strong>");

			app.init();
		},

		errorDB: function(tx, err) {
			console.error("errorCB: Opps!: " + err.code);
		},

		init: function() {
			console.log('init: Go app!');
			deferred.resolve();	
		}
	};

	
	return function() {
		if (app.checkUpdatedData()) {
			console.log("Datos actualizados!");
			deferred.resolve();	
		} else {
			app.loadSur();
		}

		return deferred.promise();
	};

});