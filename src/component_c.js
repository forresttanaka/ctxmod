import React from 'react';
import ComponentE from './component_e';
import { GlobalContext } from './context';


const ComponentC = () => {
    const { moduleA } = React.useContext(GlobalContext);

    return (
        <div className="component-c">
            Component C department {moduleA.department}
            <ComponentE />
        </div>
    );
};

export default ComponentC;
