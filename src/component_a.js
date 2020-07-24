import React from 'react';
import { GlobalCtxmod } from './ctxmod';


const ComponentA = () => {
    const { ctxmodCounter, moduleName } = React.useContext(GlobalCtxmod);

    return (
        <div className="component component--a">
            <h2>Component A</h2>
            <div>Counter: {ctxmodCounter.counter}</div>
            <div>Name: {moduleName.name || <i>none</i>}</div>
        </div>
    );
};

export default ComponentA;
