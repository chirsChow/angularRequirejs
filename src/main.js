'use strict';

require(['config'], function (config) {
    require(['src/_module'], function (app) {
        app.bootstrap(app);
    });
    console.log('application initialized successfully..');
});
