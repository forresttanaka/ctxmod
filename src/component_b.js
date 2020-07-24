import React from 'react';
import ComponentD from './component_d';
import { GlobalCtxmod } from './ctxmod';
import CounterControls from './counter';


const ComponentB = () => {
    const { ctxmodCounter } = React.useContext(GlobalCtxmod);

    return (
        <div className="component component--b">
            <h2>Component B</h2>
            <div>Counter: {ctxmodCounter.counter}</div>
            <CounterControls />
            <ComponentD />
        </div>
    );
};

export default ComponentB;
