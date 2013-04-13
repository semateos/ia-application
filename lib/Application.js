(function (InnoAccel, Location, _) {
    "use strict";

    /**
     * Application bootstrapping class.
     *
     * @module Application
     * @namespace InnoAccel
     * @class Application
     * @param {Object} instances
     * @constructor
     */
    InnoAccel.Application = function (instances) {
        /**
         * this-pointer
         *
         * @property self
         * @private
         * @type {InnoAccel.Application}
         */
        var self = this,

        /**
         * Name-Service object for the registered services:
         *  - view
         *  - request
         *  - router
         *  - dispatcher
         *
         * @property services
         * @private
         * @type {Object}
         */
            services = instances || {},

        /**
         * Array of registered modules.
         *
         * @property registeredModules
         * @private
         * @type {Object[]}
         */
            registeredModules = [];

        if (!services.view) {
            services.view = new InnoAccel.Controller.View();
        }
        if (!services.request) {
            services.request = Location;
        }
        if (!services.router) {
            services.router = new InnoAccel.Router.Reactive(
                new InnoAccel.Router.SimpleRouteList([]),
                services.request.getPath
            );
        }
        if (!services.dispatcher) {
            services.dispatcher = new InnoAccel.Controller.Dispatcher(services.router.match, []);
        }

        /**
         * Get the application's request object
         *
         * @method getRequest
         * @returns {Meteor.Location}
         */
        this.getRequest = function () {
            return services.request;
        };

        /**
         * Get the application's dispatcher
         *
         * @method getDispatcher
         * @returns {InnoAccel.Controller.Dispatcher}
         */
        this.getDispatcher = function () {
            return services.dispatcher;
        };

        /**
         * Get the application's reactive router
         *
         * @method getRouter
         * @returns {InnoAccel.Router.Reactive}
         */
        this.getRouter = function () {
            return services.router;
        };

        /**
         * Get the application's view
         *
         * @method getView
         * @returns {InnoAccel.Controller.View}
         */
        this.getView = function () {
            return services.view;
        };

        /**
         * Register a module with the application
         *
         * Must be called before bootstrap.
         *
         * @method registerModule
         * @param {Object} module
         * @fluent
         * @returns {InnoAccel.Application}
         */
        this.registerModule = function (module) {
            registeredModules.push(module);
            return self;
        };

        /**
         * Register an array of modules with the application
         *
         * Must be called before bootstrap.
         *
         * @method registerModules
         * @param {Object[]} modules
         * @fluent
         * @returns {InnoAccel.Application}
         */
        this.registerModules = function (modules) {
            _.each(modules, function (module) {
                registeredModules.push(module);
            });
            return self;
        };

        /**
         * Bootstrap the application.
         *
         * This calls the bootstrap method of all registered modules.
         *
         * @method bootstrap
         * @fluent
         * @returns {InnoAccel.Application}
         */
        this.bootstrap = function () {
            _.each(registeredModules, function (module) {
                module.bootstrap(self);
            });
            return self;
        };

        /**
         * Start the application.
         *
         * This calls the start method of each application and starts the dispatcher afterwards.
         *
         * @method start
         * @fluent
         * @returns {InnoAccel.Application}
         */
        this.start = function () {
            _.each(registeredModules, function (module) {
                module.start(self);
            });
            this.getDispatcher().start();
            return self;
        };
    };
}(InnoAccel, Meteor.Location,  _));
