import React from 'react';
import { GlobalContext } from './context';


const ComponentD = () => {
    const { backdrop } = React.useContext(GlobalContext);

    return (
        <div className="component-d">
            <div>Component D {backdrop}</div>
        </div>
    );
};

export default ComponentD;
