/**
 * Module to demonstrate a counter and counter controls using the context registry.
 */
import React from 'react';
import { GlobalCtxmod, globalCtxmodRegistry } from './context';


/**
 * Reducer function for the counter.
 */
const module1Initial = 0;
const module1Reducer = (counter, action) =>{
    switch(action) {
        case 'increment':
            return counter + 1;
        case 'decrement':
            return counter - 1;
        case 'reset':
            return module1Initial;
        default:
            return counter;
    }
};


/**
 * Custom hook that returns the states and actions associated with the counter.
 */
const useModuleCounter = () => {
    const [counter, dispatch] = React.useReducer(module1Reducer, module1Initial);

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

globalCtxmodRegistry.register('moduleCounter', useModuleCounter);


/**
 * Component for the counter controls.
 */
const CounterControls = () => {
    const { moduleCounter } = React.useContext(GlobalCtxmod);

    return (
        <div className="counter-controls">
            <button onClick={() => moduleCounter.increment()}>Increment</button>
            <button onClick={() => moduleCounter.decrement()}>Decrement</button>
            <button onClick={() => moduleCounter.reset()}>Reset</button>
        </div>
    )
};

export default CounterControls;
