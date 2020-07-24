import React from 'react';
import ComponentA from './component_a';
import ComponentB from './component_b';
import ComponentC from './component_c';
import { GlobalCtxmod, useGlobalContext } from './context';
import './App.css';


const App = () => {
    const modules = useGlobalContext();

    return (
        <div className="App">
            <h1>React Modular Contexts</h1>
            <GlobalCtxmod.Provider value={modules}>
                <ComponentA />
                <ComponentB />
                <ComponentC />
            </GlobalCtxmod.Provider>
        </div>
    );
}

export default App;
