/**
* COOL4CODE
* Authors:
*
* Alejandro Zarate: azarate@cool4code.com,
* Marcos Aguilera: maguilera@cool4code.com,
* Paola Vanegas: pvanegas@cool4code.com,
* David Alméciga: walmeciga@cool4code.com"
*/

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

require(['fastclick', 'app/router'], function(fclick, router) {
    fclick.attach(document.body);    
    var Router = new router();
    Backbone.history.start();
});