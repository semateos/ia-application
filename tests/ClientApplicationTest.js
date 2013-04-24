Tinytest.add('ia-application - ClientApplication - bootstrap informs all registered modules', function (test) {
    var application = new InnoAccel.Application({}),
        calls = 0,
        moduleMock = {bootstrap: function () { calls++; }};
    application.registerModule(moduleMock);
    application.bootstrap();
    test.equal(calls, 1);
});

Tinytest.add('ia-application - ClientApplication - bootstrap registered modules after bootstrap', function (test) {
    var application = new InnoAccel.Application({}),
        calls = 0,
        moduleMock = {bootstrap: function () { calls++; }};
    application.bootstrap();
    application.registerModules([moduleMock]);
    application.registerModules([moduleMock]);
    test.equal(calls, 2);
});

Tinytest.add('ia-application - ClientApplication - start registered modules', function (test) {
    var application = new InnoAccel.Application({getService: function () {return {dispatch: function() {}}}}),
        calls = 0,
        moduleMock = {start: function () { calls++; }};
    application.registerModules([moduleMock, moduleMock]);
    application.start();
    test.equal(calls, 2);
});

Tinytest.add('ia-application - ClientApplication - start uses dispatcher of service locator', function (test) {
    var calls = 0,
        dispatcherMock = {dispatch: function() { calls++; }},
        application = new InnoAccel.Application({getService: function () {return dispatcherMock}});
    application.start();
    test.equal(calls, 1);
});
