import React from 'react';
import ComponentD from './component_d';


const ComponentB = () => {
    return (
        <div className="component-b">
            Component B
            <ComponentD />
        </div>
    );
};

export default ComponentB;
