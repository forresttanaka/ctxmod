/**
 * Module to demonstrate a counter and counter controls using the context registry.
 */
import React from 'react';
import { GlobalContext, globalContextRegistry } from './context';


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
    return {
        // states
        counter,
        // actions
        dispatch,
    }
};

globalContextRegistry.register('moduleCounter', useModuleCounter);


/**
 * Component for the counter controls.
 */
const CounterControls = () => {
    const { moduleCounter } = React.useContext(GlobalContext);

    return (
        <div className="counter-controls">
            <button onClick={() => moduleCounter.dispatch('increment')}>Increment</button>
            <button onClick={() => moduleCounter.dispatch('decrement')}>Decrement</button>
            <button onClick={() => moduleCounter.dispatch('reset')}>Reset</button>
        </div>
    )
};

export default CounterControls;
