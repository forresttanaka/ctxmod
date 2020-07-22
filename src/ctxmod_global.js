/**
 * Creates a ctxmod registry and context for the entire example app. You would normally do this for
 * your app’s global context, and again for any ctxmod contexts needed by any of your component
 * subtrees.
 */
import React from 'react';
import CtxmodRegistry from './ctxmod';


/**
 * Global context registry must be imported by each ctxmod needing to register their own context
 * modules to the global context.
 */
export const globalCtxmodRegistry = new CtxmodRegistry();


/**
 * Global context imported by global context consumers.
 */
const GlobalCtxmodContext = React.createContext();

export default GlobalCtxmodContext;
