import React from 'react';
import { GlobalContext } from './context';
import ComponentF from './component_f';


const ComponentE = () => {
    const { module1 } = React.useContext(GlobalContext);

    const handleClick = () => {
        module1.setName('Druyan');
    };

    return (
        <div className="component-e">
            <div>Component E {module1.name}</div>
            <button onClick={handleClick}>Change</button>
            <ComponentF />
        </div>
    );
};

export default ComponentE;
