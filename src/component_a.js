import React from 'react';
import { globalContextRegistry } from './context';


const useModuleA = () => {
    const [department, setDepartment] = React.useState('marketing');
    return {
        department,
        setDepartment,
    }
};


globalContextRegistry.register('moduleA', useModuleA);


const ComponentA = () => {
    return (
        <div className="component-a">
            Component A
        </div>
    );
};

export default ComponentA;
