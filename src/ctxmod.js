import React from 'react';


/**
 * Manages the context registry that allows React components at any level of the hierarchy to
 * access the same set of states and actions regardless of where they appear within that hierarchy
 * and without prop drilling.
 *
 * The <App> component owns the global context, but other portions of the web app can establish
 * their own context for their own sub hierarchies to share.
 */

class CtxmodRegistryCore {
    constructor() {
        this._registry = {};
    }

    /**
     * Register a React component to render a facet with the field value matching `field`.
     * @param {string} field facet.field value to register
     * @param {array} component Rendering component to call for this field value
     */
    register(name, module) {
        if (this._registry[name]) {
            console.warn('Context module "%s" already registered', name);
        } else {
            this._registry[name] = module;
        }
    }

    /**
     * Look up the views available for the given object @type. If the given @type was never
     * registered, an array of the default types gets returned. Mostly this gets used internally
     * but available for external use if needed.
     * @param {string} resultType `type` property of search result `filters` property.
     *
     * @return {array} Array of available/registered views for the given type.
     */
    * retrieve() {
        for (const name in this._registry) {
            yield { name, module: this._registry[name] };
        }
    }
};


/**
 * Global context registry must be imported by each module needing to register their own context
 * modules to the global context.
 */
export const globalCtxmodRegistry = new CtxmodRegistryCore();


/**
 * Global context imported by global context consumers.
 */
export const GlobalCtxmod = React.createContext(null);


/**
 * Custom hook for establishing registered global contexts, returning an object with each module
 * name as a key and each value an object containing that module's states and actions.
 */
export const useGlobalContext = () => {
    const allModules = {};

    // Add the objects containing each registered module's states and actions. Each module is a
    // custom hook that must be called unconditionally in this fuction.
    for (const ctxmodName of globalCtxmodRegistry.retrieve()) {
        allModules[ctxmodName.name] = ctxmodName.module();
    }

    return allModules;
};
