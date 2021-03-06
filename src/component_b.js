import React from 'react';
import ComponentD from './component_d';
import GlobalCtxmodContext from './ctxmod_global';
import CounterControls from './counter';


const ComponentB = () => {
    const { ctxmodCounter } = React.useContext(GlobalCtxmodContext);

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
