import React from 'react';
import { GlobalContext } from './context';


const ComponentD = () => {
    const { module0 } = React.useContext(GlobalContext);

    return (
        <div className="component-d">
            <div>Component D {module0.backdrop}</div>
        </div>
    );
};

export default ComponentD;
