import React from 'react';
import ComponentD from './component_d';
import { GlobalContext } from './context';


const ComponentB = () => {
    const { moduleA } = React.useContext(GlobalContext);

    const handleClick = () => {
        moduleA.setDepartment('sales');
    };

    return (
        <div className="component-b">
            <div>Component B Department {moduleA.department}</div>
            <button onClick={handleClick}>Change</button>
            <ComponentD />
        </div>
    );
};

export default ComponentB;
