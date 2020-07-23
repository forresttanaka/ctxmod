import React from 'react';
import ComponentA from './component_a';
import ComponentB from './component_b';
import ComponentC from './component_c';
import { GlobalContext, useGlobalContext, globalContextRegistry } from './context';
import './App.css';


/**
 * Examples of context modules owned and registered by <App>.
 */
const useModule0 = () => {
    const [department, setDepartment] = React.useState('Sagan');
    return {
        department,
        setDepartment,
    }
};

globalContextRegistry.register('module0', useModule0);

const useModule1 = () => {
    const [name, setName] = React.useState('default');
    return {
        name,
        setName,
    }
};

globalContextRegistry.register('module1', useModule1);


const App = () => {
    const modules = useGlobalContext();

    return (
        <div className="App">
            <GlobalContext.Provider value={modules}>
                <ComponentA />
                <ComponentB />
                <ComponentC />
            </GlobalContext.Provider>
        </div>
    );
}

export default App;
