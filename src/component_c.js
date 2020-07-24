import React from 'react';
import ComponentE from './component_e';
import { GlobalCtxmodContext } from './ctxmod';


/**
 * Create a regular React context just for Component C and its children to share. This 
 */
export const CBranchContext = React.createContext(null);


const ComponentC = () => {
    const [annunciated, setAnnunciated] = React.useState(false);
    const { ctxmodName } = React.useContext(GlobalCtxmodContext);

    const handleCheckbox = (e) => {
        setAnnunciated(e.target.checked);
    };

    return (
        <div className="component component--c">
            <CBranchContext.Provider value={{ annunciated, setAnnunciated }}>
                <h2>Component C</h2>
                <div>Name: {ctxmodName.name || <i>none</i>}</div>
                <input type="checkbox" id="annunciated" name="annunciated" checked={annunciated} onChange={handleCheckbox} />
                <label htmlFor="annunciated">Annunciated</label>
                <ComponentE />
            </CBranchContext.Provider>
        </div>
    );
};

export default ComponentC;
