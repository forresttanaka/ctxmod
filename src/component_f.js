import React from 'react';
import { GlobalContext } from './context';


const ComponentF = () => {
    const { module0, module1 } = React.useContext(GlobalContext);

    const handleClick = () => {
        module0.setBackdrop('Backdrop F');
    };

    return (
        <div className="component-f">
            <div>Component F {module0.backdrop} {module1.name}</div>
            <button onClick={handleClick}>Change</button>
        </div>
    );
};

export default ComponentF;
