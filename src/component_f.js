import React from 'react';
import { GlobalContext } from './context';
import CounterControls from './counter';


const ComponentF = () => {
    const { moduleCounter } = React.useContext(GlobalContext);

    return (
        <div className="component component--f">
            <h2>Component F</h2>
            <div>Counter: {moduleCounter.counter}</div>
            <CounterControls />
        </div>
    );
};

export default ComponentF;
