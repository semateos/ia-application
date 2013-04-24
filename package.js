Package.describe({
    summary: 'Adapter for the packages ia-navigation and ia-router-reactive'
});

Package.on_use(function (api, where) {
    api.use(['ia-dispatcher', 'ia-router-reactive', 'ia-viewlayout-helper', 'meteor-location', 'underscore'], 'client');

    api.add_files([
        'lib/namespace.js',
        'lib/ServiceLocator.js',
        'lib/ClientApplication.js'
    ], 'client');

    api.add_files([
        'lib/namespace.js',
        'lib/ServiceLocator.js',
        'lib/ServerApplication.js'
    ], 'server');
});

Package.on_test(function (api) {
    api.use(['ia-application', 'tinytest'], 'client');

    api.add_files([
        'tests/ServiceLocatorTest.js',
        'tests/ClientApplicationTest.js'
    ], 'client');

    api.add_files([
        'tests/ServiceLocatorTest.js',
        'tests/ServerApplicationTest.js'
    ], 'server');
});
