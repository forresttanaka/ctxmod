# ctxmod

ctxmod (see-tee-ex-mod) lets individual modules add states and actions to a single [React 16.8 context](https://reactjs.org/docs/hooks-reference.html#usecontext), avoiding nesting multiple React context providers.

React 16.8 and beyond includes a new version of the existing context mechanism that allows sibling and cousin modules to share and modify states owned by parent components without the need for prop drilling nor render props.

The general pattern for React contexts involves creating a React state and state-setter function in the usual way:

```
const [exampleState, setExampleState] = React.useState(initialStateValue);
const ExampleContext = React.createContext();
```
And then you can tie the state to the context by inserting a provider component to the top of the React hierarchy that needs this state and passing the state and state setter as the value of the provider:

```
<div>
    <ExampleContext.Provider value={{ exampleState, setExampleState }}>
        {child components needing exampleState and setExampleState}
    </ExampleContext.Providers>
</div>
```

Any child components needing `exampleState` and/or `setExampleState` simply uses the `ExampleContext` variable to retrieve the context’s `exampleState` and `setExampleState` as though owned by the child components themselves:

```
const { exampleState, setExampleState } = React.useContext(ExampleContext);
```

## ctxmod’s purpose

Multiple modules needing to use React contexts to share unrelated states and actions results in nested providers, one for each individual need, e.g.

```
<Context1.Provider>
    <Context2.Provider>
        <Context3.Provider>
            {components needing to use all three contexts}
        </Context3.Provider>
    </Context2.Provider>
</Context1.Provider>
```

ctxmod provides a mechanism for arbitrary provider modules to register themselves by name with a single context, and consumers use these ctxmod names to access states and actions from specific providers in this context. This single context lets you combine all these modules into a single provider, avoiding nested providers.

## Registering ctxmods
You must first create a ctxmod registry. In this example, I call the registry `globalCtxmodRegistry`.

```
import CtxmodRegistry from './ctxmod';
const globalCtxmodRegistry = new CtxmodRegistry();
```

Modules can then register a custom hook that creates states and actions and returns them in an object. To maintain consistency, return the states first in the object, then the actions, and comment each section. You can have as many associated states and actions as you need. If you have a more complex case, you can use a reducer here too. In this example, a counter module registers itself with `globalCtxmodRegistry` with the ctxmod name, “ctxmodCounter.” I recommend using “ctxmod” as a prefix for all of your ctxmod names for documentation.

```
const useCtxmodCounter = () => {
    const [counter, setCounter] = React.useState(0);
    return {
        // states
        counter,
        // actions
        setCounter,
    }
};

globalCtxmodRegistry.register('ctxmodCounter', useCtxmodCounter);
```

Use a unique name when registering your ctxmod. Your consumers use this name to retrieve the states and actions for your ctxmod. Pass the custom hook as the second parameter. Do this for as many ctxmods as you need within the context — `globalCtxmodRegistry` in this case.

## The ctxmod provider

Within the component that owns the context containing the ctxmods, call the `useCtxmodContext` custom hook that collects — effectively owning — all the registered ctxmod states and actions into one provider object value. The keys of the object comprise each of the ctxmod names you registered, and the values of these keys comprise all the corresponding states and actions within the object you returned in the ctxmod custom hook.

```
const GlobalCtxmodContext = React.createContext();
const ctxmods = useCtxmodContext(globalCtxmodRegistry);

return (
    <div className="App">
        <h1>React Modular Contexts</h1>
        <GlobalCtxmodContext.Provider value={ctxmods}>
            {child components that can uses these ctxmod states and actions}
        </GlobalCtxmodContext.Provider>
    </div>
);
```

Then you can use the context variable you allocated — here `GlobalCtxmodContext` — as a provider in the usual way, passing it the combined ctxmods variable as its value.

## Consuming ctxmods

You consume ctxmods much like you consume any other context values, but because ctxmod contexts contain all the ctxmods you’ve registered and accessible by their registered names, you simply destructure the return value of `useContext` using the name of the ctxmods you want to use in the component. In this example, we only want to use the “ctxmodCounter” ctxmod and ignore the others.

```
const { ctxmodCounter } = React.useContext(GlobalCtxmodContext);
```

In this case, `ctxmodCounter` contains the `counter` state and the `setCounter` action, and you can use them like this:

```
return (
    <div>
        Counter value: {ctxmodCounter.counter}
        <button onClick={() => ctxmodCounter.setCounter(ctxmodCounter.counter + 1)}>Increment</button>
    </div>
);
```

I made an example project in this repo showing three divs, each containing nested divs styled so you can visualize them easily, and ctxmods that get shared across cousin divs. ctxmod.js contains the ctxmod library you can include in your project.

I broke the two ctxmods into their own files, much as you might do. One tracks a name typed in by the user that gets displayed across a couple of divs, and one tracks a counter that you can increment, decrement, and reset. The counter uses a reducer to show that case. One more context tracks a boolean annunciator, showing that simple cases should still use a basic context without ctxmod.

I bootstrapped this project with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
