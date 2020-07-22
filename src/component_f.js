import React from 'react';
import { GlobalContext } from './context';


const ComponentF = () => {
    const { backdrop, setBackdrop } = React.useContext(GlobalContext);

    const handleClick = () => {
        setBackdrop('Backdrop F');
    };

    return (
        <div className="component-f">
            <div>Component F {backdrop}</div>
            <button onClick={handleClick}>Change</button>
        </div>
    );
};

export default ComponentF;
