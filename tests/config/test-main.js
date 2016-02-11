require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/src',
    paths: {
        'angular': '../build/libs/angular/angular',
        'angular-cookies': 'libs/angular/angular-cookies.min',
        'angular-mocks': '../tests/libs/angular-mocks',
        'mock-ajax': '../tests/libs/mock-ajax'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-mocks': {
            deps: ["angular"],
            exports: 'mocks'
        },
        'angular-cookies': {
            deps: ['angular'],
            exports: 'angular-cookies'
        },
    }
});

var requireModules = [];

(function () {
    for (file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {

            if (file.substring(file.length - 7, file.length) === 'Spec.js') {
                requireModules.push(file);
            }
        }
    }

})(window);

require(requireModules,
    function () {
        window.__karma__.start();
    });


