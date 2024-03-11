import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducers from "./Reducers";

export function configureStore(InitialState) {
    const Store = createStore(
        Reducers,
        InitialState,
        composeWithDevTools(applyMiddleware(thunk))
    );
    return Store;
}
