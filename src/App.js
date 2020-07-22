import React from 'react';
import ComponentA from './component_a';
import ComponentB from './component_b';
import ComponentC from './component_c';
import { GlobalContext } from './context';
import './App.css';


const App = () => {
    const [backdrop, setBackdrop] = React.useState('default');
    const [name, setName] = React.useState('Sagan');
    const modules = {
        module0: {
            // States
            backdrop,
            // Actions
            setBackdrop,
        },
        module1: {
            // States
            name,
            // Actions
            setName,
        }
    };

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
