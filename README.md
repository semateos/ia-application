ia-application
==============
Application bootstrapping class for Meteor.

This package provides an easy way to setup modularized Meteor applications. The application can run on both the client and the server.

The workflow is:
- Create application
- (Set up)
- Register modules
- Bootstrap
- Start

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

## ServiceLocator
The service locator provides a very easy and simple way to share services. In essence it's just a key-object store.

## Modules
Modules provide a grouped-together functionality of the application. The object registered to the application has to have two methods:
- `bootstrap(serviceLocator)`: called upon bootstrapping the application. The `serviceLocator` is the application's one.
- `start(serviceLocator)`: called upon starting the application. The `serviceLocator` is the application's one.

The `bootstrap` callback can be used for registering own services or access other services (e.g. the router, dispatcher).

## On the client
The application requires four services to be present in the service locator:
- `application.request`: Instance of `Meteor.Location`
- `application.view`: Instance of `InnoAccel.Controller.View`
- `application.router`: Instance of `InnoAccel.Router.Reactive`
- `application.dispatch`: Instance of `InnoAccel.Controller.Dispatcher`
Obviously instances of other classes can be used as long as they have the same interface. Use the method `setUp` to fill the service locator with sensible defaults. The `setUp` call is optional and can be skipped in the service locator is fully configured manually.

When `start`ing the application, the `application.dispatcher` is started.

## On the server
On the server the workflow is the same as on the client. However it does not require any service. The `Application` just acts as a execution-context.

The `setUp` function does nothing on the server.

## Example application
An example application is available in a separate repository: [ia-application-example](https://github.com/InnoAccel/ia-application-example)

## API
The source code is fully annotated.

## Contact
fge @freenode
