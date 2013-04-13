(function (Controller, Template, parent) {
    "use strict";

    Controller.Todo = function (view) {
        parent.call(this, {module: 'todo'});

        var self = this,
            items;

        this.dispatch = function (match) {
            items = Meteor.subscribe("todoitems");
            switch (match.getParam('action', 'list')) {
                case 'view':
                    self.detailsAction(match.getParam('id'));
                    break;
                case 'list':
                default:
                    self.listAction();
                    break;
            }
        };

        this.detailsAction = function (id) {
            Template['todo.view'].todoid = id;
            view.set(
                Template['todo.layout'],
                Template['todo.view']
            );
        };

        this.listAction = function () {
            Template['todo.list'].setCursor(Todo.Collection.Items.find());
            Template['todo.list'].createCallback = self.createProject;
            view.set(
                Template['todo.layout'],
                Template['todo.list']
            );
        };

        this.createProject = function (name) {
            Todo.Collection.Items.insert({name: name});
        };
    };

    function SurrogateConstructor() {}
    SurrogateConstructor.prototype = parent.prototype;
    Controller.Todo.prototype = new SurrogateConstructor();
    Controller.Todo.prototype.constructor = Controller.Index;
}(Todo.Controller, Template, Controller.BasicController));
