ia-application
==============
Application bootstrapping class for Meteor.

This class provides means to register modules with a application, have a shared set of key resources and common application events `bootstrap` and `start`.

The workflow is:
- Create application
- (Set up)
- Register modules
- Bootstrap
- Start

### Dependencies
This package bundles different packages like `ia-router-reactive`, `ia-dispatcher`, `ia-viewlayout-helper`.

## Creating an application
Creating a new instance of the application is quite easy:
```javascript
var serviceLocator = new InnoAccel.ServiceLocator();
    application = new InnoAccel.Application(serviceLocator);

application.setUp()
    .registerModules([
        // list of modules of the application
    ])
    .bootstrap();
Meteor.startup(function () {
    application.start();
});
```

The `setUp` call is optional and can be skipped in the service locator is fully configured manually.

## ServiceLocator
The service locator provides a very easy and simple way to share services. In essence it's just a key-object store.

The application requires four services to be present in the service locator:
- `application.request`: Instance of `Meteor.Location`
- `application.view`: Instance of `InnoAccel.Controller.View`
- `application.router`: Instance of `InnoAccel.Router.Reactive`
- `application.dispatch`: Instance of `InnoAccel.Controller.Dispatcher`
Obviously instances of other classes can be used as long as they have the same interface. Use the method `setUp` to fill the service locator with sensible defaults.

## Modules
Modules provide a grouped-together functionality of the application. The object registered to the application has to have two methods:
- `bootstrap(serviceLocator)`: called upon bootstrapping the application. The `serviceLocator` is the application's one.
- `start(serviceLocator)`: called upon starting the application. The `serviceLocator` is the application's one.

The `bootstrap` callback can be used for registering own services or access other services (e.g. the router, dispatcher).

## Example
There is an example in the examples directory. Run `mrt update` before.

## API
The source code is fully annotated.

## Contact
fge @freenode
