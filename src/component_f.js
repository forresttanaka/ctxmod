import React from 'react';
import { GlobalCtxmod } from './ctxmod';
import CounterControls from './counter';


const ComponentF = () => {
    const { ctxmodCounter } = React.useContext(GlobalCtxmod);

    return (
        <div className="component component--f">
            <h2>Component F</h2>
            <div>Counter: {ctxmodCounter.counter}</div>
            <CounterControls />
        </div>
    );
};

export default ComponentF;
