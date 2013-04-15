/**
 * Application bootstrapping class.
 *
 * @module Application
 * @namespace InnoAccel
 * @class Application
 * @param {InnoAccel.ServiceLocator} serviceLocator The service locator to fetch the application components from
 * @constructor
 */
InnoAccel.Application = function (serviceLocator) {
    "use strict";

    /**
     * this-pointer
     *
     * @property self
     * @private
     * @type {InnoAccel.Application}
     */
    var self = this,

    /**
     * Array of registered modules.
     *
     * @property registeredModules
     * @private
     * @type {Object[]}
     */
        registeredModules = [];

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
     * This calls the bootstrap method of all registered modules with the application's service locator as the only argument.
     *
     * @method bootstrap
     * @fluent
     * @returns {InnoAccel.Application}
     */
    this.bootstrap = function () {
        _.each(registeredModules, function (module) {
            module.bootstrap(serviceLocator);
        });
        return self;
    };

    /**
     * Start the application.
     *
     * This calls the start method of each application  with the application's service locator as the only argument and starts the dispatcher afterwards.
     *
     * @method start
     * @fluent
     * @returns {InnoAccel.Application}
     */
    this.start = function () {
        _.each(registeredModules, function (module) {
            module.start(serviceLocator);
        });
        serviceLocator.getService('application.dispatcher').dispatch();
        return self;
    };

    /**
     * Fill the service locator with default instances of the application's required services if not already registered
     *
     * Will only set up services not registered. Uses the registered services for dependencies.
     *
     * @method setUp
     * @fluent
     */
    this.setUp = function () {
        if (!serviceLocator.hasService('application.request')) {
            serviceLocator.registerService('application.request', Meteor.Location);
        }
        if (!serviceLocator.hasService('application.view')) {
            serviceLocator.registerService('application.view', new InnoAccel.Controller.View());
        }
        if (!serviceLocator.hasService('application.router')) {
            serviceLocator.registerService('application.router', new InnoAccel.Router.Reactive(
                new InnoAccel.Router.SimpleRouteList([]),
                serviceLocator.getService('application.request').getPath
            ));
        }
        if (!serviceLocator.hasService('application.dispatcher')) {
            serviceLocator.registerService(
                'application.dispatcher',
                new InnoAccel.Controller.Dispatcher(serviceLocator.getService('application.router').match, [])
            );
        }
        return self;
    };
};
