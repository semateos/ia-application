/**
 * A very simple service locator.
 *
 * @module Application
 * @namespace InnoAccel
 * @class ServiceLocator
 * @constructor
 */
/**
 * At some point this might be fed by a DIC. Couldn't find a suitable yet which does not use AMD / require.
 */
InnoAccel.ServiceLocator = function () {
    /**
     * Array containing all services.
     * ServiceName -> ServiceInstance
     *
     * @property services
     * @type {Object[]}
     */
    var services = [];

    /**
     * Register a service with this container under a given name
     *
     * Throws an error if the service name is already used.
     *
     * @fluent
     * @param {String} name
     * @param {Object} instance
     */
    self.registerService = function (name, instance) {
        if (services[name]) {
            throw new Error("Already has a service named " + name);
        }
        services[name] = instance;
        return this;
    };

    /**
     * Check if a service is registered for a given service name
     *
     * @param {String} name
     * @returns {boolean} True is the service name has an associated service
     */
    self.hasService = function (name) {
        return !!services[name];
    };

    /**
     * Get the service registered for the given service name
     *
     * Throws an error if there is no service registered for the service name
     *
     * @param {String} name
     * @returns {Object}
     */
    self.getService = function (name) {
        if (!services[name]) {
            throw new Error("Has no service named " + name);
        }
        return services[name];
    };
};
