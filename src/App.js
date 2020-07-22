import React from 'react';
import ComponentA from './component_a';
import ComponentB from './component_b';
import ComponentC from './component_c';
import { GlobalContext } from './context';
import './App.css';


const App = () => {
    const [backdrop, setBackdrop] = React.useState('default');

    return (
        <div className="App">
            <GlobalContext.Provider value={{ backdrop, setBackdrop }}>
                <ComponentA />
                <ComponentB />
                <ComponentC />
            </GlobalContext.Provider>
        </div>
    );
}

export default App;
