(function (Package) {
    "use strict";

    Package.describe({
        summary: 'Simple TODO-Lists'
    });

    Package.on_use(function (api, where) {
        api.use(['ia-navigation-reactiverouter', 'ia-basiccontroller', 'templating'], 'client');

        api.add_files([
            'Module.js',
            'Collection/Todo.js',
            'Views/layout.html',
            'Views/list.html',
            'Views/list.js',
            'Views/view.html',
            'Controller/Todo.js'
        ], 'client');

        api.add_files(['Module.js', 'Collection/Todo.js'], 'server');
    });
}(Package));
