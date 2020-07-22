/**
 * Module to demonstrate a counter and counter controls using the context registry.
 */
import React from 'react';
import GlobalCtxmodContext, { globalCtxmodRegistry } from './ctxmod_global';


/**
 * Reducer function for the counter.
 */
const counterInitial = 0;
const counterReducer = (counter, action) => {
    switch(action) {
        case 'increment':
            return counter + 1;
        case 'decrement':
            return counter - 1;
        case 'reset':
            return counterInitial;
        default:
            return counter;
    }
};


/**
 * Custom hook that returns the states and actions associated with the counter.
 */
const useCtxmodCounter = () => {
    const [counter, dispatch] = React.useReducer(counterReducer, counterInitial);

    const increment = () => {
        dispatch('increment');
    };

    const decrement = () => {
        dispatch('decrement');
    };

    const reset = () => {
        dispatch('reset');
    };

    return {
        // states
        counter,
        // actions
        increment,
        decrement,
        reset,
        // You could alternatively simply return `dispatch`, so consumers call `dispatch` for this
        // module, passing it the reducer action.
    }
};

globalCtxmodRegistry.register('ctxmodCounter', useCtxmodCounter);


/**
 * Component for the counter controls.
 */
const CounterControls = () => {
    const { ctxmodCounter } = React.useContext(GlobalCtxmodContext);

    return (
        <div className="counter-controls">
            <button onClick={() => ctxmodCounter.increment()}>Increment</button>
            <button onClick={() => ctxmodCounter.decrement()}>Decrement</button>
            <button onClick={() => ctxmodCounter.reset()}>Reset</button>
        </div>
    )
};

export default CounterControls;
