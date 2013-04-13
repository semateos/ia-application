(function (Template) {
    "use strict";

    Template.setCursor = function (cursor) {
        Template.items = function () {
            return cursor;
        };
    };

    Template.createCallback = undefined;

    Template.events({
        'click .btn': function (event) {
            var el = $("#new-item");
            if (el.val() !== "") {
                if (Template.createCallback)
                    Template.createCallback(el.val());
                else
                    console.log('No create callback registered');
            } else {
                console.log('empty!');
            }
        }
    });
}(Template['todo.list']));
