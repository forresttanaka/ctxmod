import React from 'react';
import GlobalCtxmodContext from './ctxmod_global';


const ComponentA = () => {
    const { ctxmodCounter, ctxmodName } = React.useContext(GlobalCtxmodContext);

    return (
        <div className="component component--a">
            <h2>Component A</h2>
            <div>Counter: {ctxmodCounter.counter}</div>
            <div>Name: {ctxmodName.name || <i>none</i>}</div>
        </div>
    );
};

export default ComponentA;
