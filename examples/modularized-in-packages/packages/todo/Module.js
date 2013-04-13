Todo = {
    Controller: {},
    Collection: {},
    Module: function () {
        "use strict";

        this.bootstrap = function (app) {
            app.getRouter().addRoute(
                new InnoAccel.Router.Segment('/todo[/[:action][/:id]]', {module: 'todo', action: 'index'})
            );
            app.getDispatcher().addController(new Todo.Controller.Todo(app.getView()));
        };

        this.start = function (app) {

        };
    }
};
