import React from 'react';
import ComponentD from './component_d';
import { GlobalContext } from './context';
import CounterControls from './counter';


const ComponentB = () => {
    const { moduleCounter } = React.useContext(GlobalContext);

    return (
        <div className="component-b">
            <h2>Component B</h2>
            <div>Counter: {moduleCounter.counter}</div>
            <CounterControls />
            <ComponentD />
        </div>
    );
};

export default ComponentB;
