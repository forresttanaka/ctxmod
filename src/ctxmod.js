import React from 'react';


/**
 * Ctxmod (see-tee-ex-mod) wraps the React context mechanism that allows React components at any
 * level of the hierarchy to access the same set of states and actions regardless of where they
 * appear within that hierarchy and without prop drilling nor render props. The ctxmod mechanism
 * allows multiple parts of the code base to register their own shared states and actions in a
 * single React context to avoid nesting each in a context Provider -- they all share one context.
 *
 * Each ctxmod context module assigns itself a unique name, and parts of the code needing to consume
 * that context module's states and actions uses its name to access them. The context module's
 * actions allow the consumer to change the states, causing a rerendering with this new state of
 * itself and any other consumers of the same context module.
 *
 * The <App> component owns the global context module, but other portions of the web app can
 * establish their own context modules for their own sub hierarchies to share, or to simply use
 * the basic React context mechanism.
 *
 * REGISTERING A CTXMOD
 * You must first create a custom hook that manages a set of states and actions that operate on
 * those states. These can be implemented with simple states or reducers.
 *
 *   const useCtxmodSomething = () => {
 *       const [something, setSomething] = React.useState('');
 *       return {
 *           // states
 *           something,
 *           // actions
 *           setSomething,
 *       }
 *   };
 *
 * You then register this custom hook with this ctxmod's name. In this example, we add this ctxmod
 * to the global ctxmod context.
 *
 *   globalCtxmodRegistry.register('somethingCtxmod', useCtxmodSomething);
 *
 * Then to consume this ctxmod, you import and use its context. As part of the object
 * desctructuring, you can pick and choose whatever ctxmods you need. For example to use the above
 * ctxmod from the global ctxmod context in a React component:
 *
 *   const { somethingCtxmod } = React.useContext(GlobalCtxmodContext);
 *
 * Several other ctxmods can exist in the global ctxmod context, and you get the ones you've
 * selected in this destructuring. Then you have access to the ctxmod's states and actions:
 *
 *   <div>{somethingCtxmod.something}</div>
 *   const setter = () => { somethingCtxmod.setSomething(newState); };
 *
 * The states and actions can use simple React states or reducers.
 */


 /**
 * Manages the ctxmod registry that allows React components to register their own modules with a
 * ctxmod.
 */
class CtxmodRegistryCore {
    constructor() {
        this._registry = {};
    }

    /**
     * Register context module with its name and the corresponding set of states and actions in an
     * React custom hook's return object. The name must be unique throughout this ctxmod.
     * @param {string} name Consumers use `name` to access states and actions
     * @param {func} ctxmodHook Custom hook returning module's states and actions in an object
     */
    register(name, ctxmodHook) {
        if (this._registry[name]) {
            console.warn('Ctxmod "%s" already registered', name);
        } else {
            this._registry[name] = ctxmodHook;
        }
    }

    /**
     * Generator to retrieve each ctxmod name and its module's custom React hook.
     *
     * @return {object} Each ctxmod's name and its custom hook
     */
    * retrieve() {
        for (const name in this._registry) {
            yield { name, ctxmodHook: this._registry[name] };
        }
    }
};


/**
 * Global context registry must be imported by each ctxmod needing to register their own context
 * modules to the global context.
 */
export const globalCtxmodRegistry = new CtxmodRegistryCore();


/**
 * Global context imported by global context consumers.
 */
export const GlobalCtxmodContext = React.createContext(null);


/**
 * Custom hook for establishing registered global ctxmods, returning an object with each module
 * name as a key and each value an object containing that module's states and actions. You can
 * think of this custom hook as owning each ctxmod's states and actions.
 */
export const useGlobalCtxmodContext = () => {
    const allCtxmods = {};

    // Add the objects containing each registered module's states and actions. Each module is a
    // custom hook that must be called unconditionally in this fuction.
    for (const ctxmodName of globalCtxmodRegistry.retrieve()) {
        allCtxmods[ctxmodName.name] = ctxmodName.ctxmodHook();
    }

    return allCtxmods;
};
