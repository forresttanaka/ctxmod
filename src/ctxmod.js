/**
 * ctxmod (see-tee-ex-mod) provides a mechanism for arbitrary provider modules to register
 * themselves by name with a single React 16.8 context, and consumers use these ctxmod names to
 * access states and actions from specific providers in this context. This single context lets you
 * combine all these modules into a single provider, avoiding nested providers.
 *
 * REGISTERING CTXMODS
 *
 * You must first create a ctxmod registry. In this example, I call the registry
 * `globalCtxmodRegistry`.
 *
 *   import CtxmodRegistry from './ctxmod';
 *   const globalCtxmodRegistry = new CtxmodRegistry();
 *
 * Modules can then register a custom hook that creates states and actions and returns them in an
 * object. To maintain consistency, return the states first in the object, then the actions, and
 * comment each section. You can have as many associated states and actions as you need. If you
 * have a more complex case, you can use a reducer here too. In this example, a counter module
 * registers itself with `globalCtxmodRegistry` with the ctxmod name, "ctxmodCounter." I recommend
 * using "ctxmod" as a prefix for all of your ctxmod names for documentation.
 *
 *   const useCtxmodCounter = () => {
 *       const [counter, setCounter] = React.useState(0);
 *       return {
 *           // states
 *           counter,
 *           // actions
 *           setCounter,
 *       }
 *   };
 *   
 *   globalCtxmodRegistry.register('ctxmodCounter', useCtxmodCounter);
 *
 * Use a unique name when registering your ctxmod. Your consumers use this name to retrieve the
 * states and actions for your ctxmod. Pass the custom hook as the second parameter. Do this for as
 * many ctxmods as you need within the context -- `globalCtxmodRegistry` in this case.
 * 
 * THE CTXMOD PROVIDER
 *
 * Within the component that owns the context containing the ctxmods, call the `useCtxmodContext`
 * custom hook that collects -- effectively owning -- all the registered ctxmod states and actions
 * into one provider object value. The keys of the object comprise each of the ctxmod names you
 * registered, and the values of these keys comprise all the corresponding states and actions
 * within the object you returned in the ctxmod custom hook.
 *
 *   const GlobalCtxmodContext = React.createContext();
 *   const ctxmods = useCtxmodContext(globalCtxmodRegistry);
 *
 *   return (
 *       <div className="App">
 *           <h1>React Modular Contexts</h1>
 *           <GlobalCtxmodContext.Provider value={ctxmods}>
 *               {child components that can uses these ctxmod states and actions}
 *           </GlobalCtxmodContext.Provider>
 *       </div>
 *   );
 *
 * Then you can use the context variable you allocated -- here `GlobalCtxmodContext` -- as a
 * provider in the usual way, passing it the combined ctxmods variable as its value.
 *
 * Consuming ctxmods
 * You consume ctxmods much like you consume any other context values, but because ctxmod contexts
 * contain all the ctxmods you've registered and accessible by their registered names, you simply
 * destructure the return value of `useContext` using the name of the ctxmods you want to use in
 * the component. In this example, we only want to use the "ctxmodCounter" ctxmod and ignore the
 * others.
 *
 *   const { ctxmodCounter } = React.useContext(GlobalCtxmodContext);
 *
 * In this case, `ctxmodCounter` contains the `counter` state and the `setCounter` action, and you
 * can use them like this:
 *
 *   return (
 *       <div>
 *           Counter value: {ctxmodCounter.counter}
 *           <button onClick={() => ctxmodCounter.setCounter(ctxmodCounter.counter + 1)}>
 *               Increment
 *           </button>
 *       </div>
 *   );
 */


 /**
 * Manages the ctxmod registry that allows React components to register their own modules with a
 * ctxmod.
 */
export default class CtxmodRegistry {
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
 * Custom hook for establishing registered global ctxmods, returning an object with each module
 * name as a key and each value an object containing that module's states and actions. You can
 * think of this custom hook as owning each ctxmod's states and actions.
 */
export const useCtxmodContext = (registry) => {
    const allCtxmods = {};

    // Add the objects containing each registered module's states and actions. Each module is a
    // custom hook that must be called unconditionally in this fuction.
    for (const ctxmodName of registry.retrieve()) {
        allCtxmods[ctxmodName.name] = ctxmodName.ctxmodHook();
    }

    return allCtxmods;
};
