(function (Package) {
    "use strict";

    Package.describe({
        summary: 'Adapter for the packages ia-navigation and ia-router-reactive'
    });

    Package.on_use(function (api, where) {
        api.use(['ia-dispatcher', 'ia-router-reactive', 'ia-viewlayout-helper', 'meteor-location', 'underscore'], 'client');

        api.add_files([
            'lib/namespace.js',
            'lib/Application.js'
        ], 'client');
    });
}(Package));
