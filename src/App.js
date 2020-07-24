import React from 'react';
import ComponentA from './component_a';
import ComponentB from './component_b';
import ComponentC from './component_c';
import { GlobalCtxmodContext, useGlobalCtxmodContext } from './ctxmod';
import './App.css';


const App = () => {
    const ctxmods = useGlobalCtxmodContext();

    return (
        <div className="App">
            <h1>React Modular Contexts</h1>
            <GlobalCtxmodContext.Provider value={ctxmods}>
                <ComponentA />
                <ComponentB />
                <ComponentC />
            </GlobalCtxmodContext.Provider>
        </div>
    );
}

export default App;
