/**
 * Module to demonstrate a counter and counter controls using the context registry.
 */
import React from 'react';
import { GlobalCtxmod, globalCtxmodRegistry } from './ctxmod';


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

globalCtxmodRegistry.register('moduleName', useModuleName);


/**
 * Component for the counter controls.
 */
const NameControls = () => {
    const [enteredName, setEnteredName] = React.useState('');
    const { moduleName } = React.useContext(GlobalCtxmod);

    const handleChange = (e) => {
        setEnteredName(e.target.value);
    }

    const handleClear = () => {
        setEnteredName('');
        moduleName.setName('');
    }

    return (
        <div className="name-controls">
            <input type="text" value={enteredName} onChange={handleChange} />
            <button onClick={() => moduleName.setName(enteredName)}>Set</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
};

export default NameControls;
