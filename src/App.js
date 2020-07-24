import React from 'react';
import ComponentA from './component_a';
import ComponentB from './component_b';
import ComponentC from './component_c';
import { GlobalContext, useGlobalContext } from './context';
import './App.css';


const App = () => {
    const modules = useGlobalContext();

    return (
        <div className="App">
            <h1>React Pluggable Contexts</h1>
            <GlobalContext.Provider value={modules}>
                <ComponentA />
                <ComponentB />
                <ComponentC />
            </GlobalContext.Provider>
        </div>
    );
}

export default App;
