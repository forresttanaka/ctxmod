import React from 'react';
import GlobalCtxmodContext from './ctxmod_global';
import CounterControls from './counter';
import { CBranchContext } from './component_c';


const ComponentF = () => {
    // Use the global ctxmod context as well as the C component context.
    const { ctxmodCounter } = React.useContext(GlobalCtxmodContext);
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
