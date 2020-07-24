/**
 * Module to demonstrate a counter and counter controls using the context registry.
 */
import React from 'react';
import { GlobalContext, globalContextRegistry } from './context';


/**
 * Custom hook that returns the states and actions associated with the counter.
 */
const useModuleName = () => {
    const [name, setName] = React.useState('');
    return {
        // states
        name,
        // actions
        setName,
    }
};

globalContextRegistry.register('moduleName', useModuleName);


/**
 * Component for the counter controls.
 */
const NameControls = () => {
    const [enteredName, setEnteredName] = React.useState('');
    const { moduleName } = React.useContext(GlobalContext);

    const handleChange = (e) => {
        setEnteredName(e.target.value);
    }

    return (
        <div className="name-controls">
            <input type="text" value={enteredName} onChange={handleChange} />
            <button onClick={() => moduleName.setName(enteredName)}>Set</button>
        </div>
    )
};

export default NameControls;
