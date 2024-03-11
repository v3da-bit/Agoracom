import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Reducers from "./Reducers";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "reducer",
    storage: storage,
    whitelist: ["auth"], // or blacklist to exclude specific reducers
};
const presistedReducer = persistReducer(persistConfig, Reducers);
const store = createStore(
    presistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { persistor, store };
