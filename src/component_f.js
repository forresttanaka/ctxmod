import React from 'react';
import { GlobalCtxmod } from './ctxmod';
import CounterControls from './counter';
import { CBranchContext } from './component_c';


const ComponentF = () => {
    const { ctxmodCounter } = React.useContext(GlobalCtxmod);
    const { annunciated } = React.useContext(CBranchContext);

    return (
        <div className="component component--f">
            <h2>Component F</h2>
            <div>Counter: {ctxmodCounter.counter}</div>
            <CounterControls />
            <div className={`annunciator${annunciated ? ' annunciator--on' : ''}`} />
        </div>
    );
};

export default ComponentF;
