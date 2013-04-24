Tinytest.add('ia-application - ServerApplication - bootstrap informs all registered modules', function (test) {
    var application = new InnoAccel.Application({}),
        calls = 0,
        moduleMock = {bootstrap: function () { calls++; }};
    application.registerModule(moduleMock);
    application.bootstrap();
    test.equal(calls, 1);
});

Tinytest.add('ia-application - ServerApplication - bootstrap registered modules after bootstrap', function (test) {
    var application = new InnoAccel.Application({}),
        calls = 0,
        moduleMock = {bootstrap: function () { calls++; }};
    application.bootstrap();
    application.registerModules([moduleMock]);
    application.registerModules([moduleMock]);
    test.equal(calls, 2);
});

Tinytest.add('ia-application - ServerApplication - start registered modules', function (test) {
    var application = new InnoAccel.Application({getService: function () {return {dispatch: function() {}}}}),
        calls = 0,
        moduleMock = {start: function () { calls++; }};
    application.registerModules([moduleMock, moduleMock]);
    application.start();
    test.equal(calls, 2);
});
