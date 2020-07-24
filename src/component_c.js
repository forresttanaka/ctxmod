import React from 'react';
import ComponentE from './component_e';
import { GlobalContext } from './context';


const ComponentC = () => {
    const { moduleName } = React.useContext(GlobalContext);

    return (
        <div className="component component--c">
            <h2>Component C</h2>
            <div>Name: {moduleName.name || <i>none</i>}</div>
            <ComponentE />
        </div>
    );
};

export default ComponentC;
