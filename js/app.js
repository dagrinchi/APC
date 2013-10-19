/**
 * COOL4CODE
 * Authors:
 *
 * Alejandro Zarate: azarate@cool4code.com,
 * Marcos Aguilera: maguilera@cool4code.com,
 * Paola Vanegas: pvanegas@cool4code.com,
 * David Alméciga: walmeciga@cool4code.com"
 */
var APC = {
    router: {},
    models: {},
    collections: {},
    views: {},
    utils: {}
};

require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl',
        bootstrap: '../../bootstrap/js'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

// require(['../../phonegap', 'app/init'], function(phonegap, init) {
//     document.addEventListener('deviceready', init);
// });

require(['app/utils/jsapi', 'fastclick', 'app/router'], function(jsapi, fclick, router) {
    jsapi(function() {
        fclick.attach(document.body);
        APC.router = new router();
        Backbone.history.start();
    });
});