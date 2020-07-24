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


const ComponentA = () => (
    <div className="component component--a">
        <h2>Component A</h2>
    </div>
);

export default ComponentA;
