/**
 * Module to demonstrate a counter and counter controls using the context registry.
 */
import React from 'react';
import { GlobalCtxmodContext, globalCtxmodRegistry } from './ctxmod';


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

globalCtxmodRegistry.register('ctxmodName', useModuleName);


/**
 * Component for the counter controls.
 */
const NameControls = () => {
    const [enteredName, setEnteredName] = React.useState('');
    const { ctxmodName } = React.useContext(GlobalCtxmodContext);

    const handleChange = (e) => {
        setEnteredName(e.target.value);
    }

    // Need to clear both the current contents of the input field as well as the name in the
    // ctxmod.
    const handleClear = () => {
        setEnteredName('');
        ctxmodName.setName('');
    }

    return (
        <div className="name-controls">
            <input type="text" value={enteredName} onChange={handleChange} />
            <button onClick={() => ctxmodName.setName(enteredName)}>Set</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    )
};

export default NameControls;
