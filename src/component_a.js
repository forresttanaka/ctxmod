import React from 'react';
import { GlobalCtxmod } from './context';


const ComponentA = () => {
    const { moduleCounter, moduleName } = React.useContext(GlobalCtxmod);

    return (
        <div className="component component--a">
            <h2>Component A</h2>
            <div>Counter: {moduleCounter.counter}</div>
            <div>Name: {moduleName.name || <i>none</i>}</div>
        </div>
    );
};

export default ComponentA;
