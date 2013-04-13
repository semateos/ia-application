(function (InnoAccel, Meteor) {
    "use strict";

    var application = new InnoAccel.Application();
    application.registerModules([
            new Todo.Module()
    ])
        .bootstrap();

    Meteor.startup(function () {
        application.start();
    });

}(InnoAccel, Meteor));
