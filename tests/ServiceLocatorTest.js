Tinytest.add('ia-application - registerService set/get service', function (test) {
    var locator = new InnoAccel.ServiceLocator(),
        service = {};

    locator.registerService('test', service);
    test.equal(locator.getService('test'), service);
});

Tinytest.add('ia-application - registerService throws Exception service already present', function (test) {
    var locator = new InnoAccel.ServiceLocator(),
        exceptionCaught;
    locator.registerService('test', {});

    try {
        locator.registerService('test', {});
    } catch (error) {
        exceptionCaught = true;
    }
    test.isTrue(exceptionCaught);
});

Tinytest.add('ia-application - registerService exception informs about duplicate service name', function (test) {
    var locator = new InnoAccel.ServiceLocator(),
        exceptionMessage;
    locator.registerService('test', {});

    try {
        locator.registerService('test', {});
    } catch (error) {
        exceptionMessage = error.message;
    }

    test.equal(exceptionMessage, 'Already has a service named test');
});

Tinytest.add('ia-application - registerService has fluent interface', function (test) {
    var locator = new InnoAccel.ServiceLocator();

    test.equal(locator.registerService('test', {}), locator);
});

Tinytest.add('ia-application - hasService true if service present', function (test) {
    var locator = new InnoAccel.ServiceLocator();
    locator.registerService('test', {});

    test.isTrue(locator.hasService('test'));
});

Tinytest.add('ia-application - hasService false is not service present', function (test) {
    var locator = new InnoAccel.ServiceLocator();

    test.isFalse(locator.hasService('test'));
});

Tinytest.add('ia-application - getService throws error if service not present', function (test) {
    var locator = new InnoAccel.ServiceLocator()
        errorCaught = false;

    try {
        locator.getService('test');
    } catch (error) {
        errorCaught = true;
    }
    test.isTrue(errorCaught);
});

Tinytest.add('ia-application - getService error infors about service not present', function (test) {
    var locator = new InnoAccel.ServiceLocator(),
        errorMessage;

    try {
        locator.getService('test');
    } catch (error) {
        errorMessage = error.message;
    }

    test.equal(errorMessage, 'Has no service named test');
});
