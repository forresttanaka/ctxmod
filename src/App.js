import React from 'react';
import ComponentA from './component_a';
import ComponentB from './component_b';
import ComponentC from './component_c';
import { useCtxmodContext } from './ctxmod';
import GlobalCtxmodContext, { globalCtxmodRegistry } from './ctxmod_global';
import './App.css';


const App = () => {
    const ctxmods = useCtxmodContext(globalCtxmodRegistry);

    return (
        <div className="App">
            <h1>ctxmod demontration</h1>
            <GlobalCtxmodContext.Provider value={ctxmods}>
                <ComponentA />
                <ComponentB />
                <ComponentC />
            </GlobalCtxmodContext.Provider>
        </div>
    );
}

export default App;
