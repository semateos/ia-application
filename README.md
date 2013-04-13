ia-application
==============
Application bootstrapping class for Meteor.

This class provides means to register modules with a application, have a shared set of key resources and common application events `bootstrap` and `start`.

The workflow is:
- Create application
- Register modules
- Bootstrap
- Start

## Dependencies
This package bundles different packages like `ia-router-reactive`, `ia-dispatcher`, `ia-viewlayout-helper`.

## Create the application
```
 var app = new InnoAccel.Application();
 ```

## Register modules
```
app.registerModule(new MyModule());
```
A Module class must have to methods: `bootstrap` and `start`. Both are called with the application instances as parameters to have means of accessing the services.

## Bootstrapping
This calls the bootstrap() method of each module in the order they were added.
```
app.bootstrap();
```

## Starting
This calls the `start` method of each module in the order they were added
```
app.start();
```

## Services
There are four services available, which key can be overwritten by the constructor:
- view, defaults to `new InnoAccel.Controller.View()`
- request, defaults to `Meteor.Location`
- router, defaults to `new InnoAccel.Router.Reactive(new InnoAccel.Router.SimpleRouteList([]), services.request.getPath))`
- dispatcher, defaults to `new InnoAccel.Controller.Dispatcher(services.router.match, [])`

## Example
There is an example in the examples directory. Run `mrt update` before.

## API
The source code is fully annotated.

## Contact
fge @freenode
