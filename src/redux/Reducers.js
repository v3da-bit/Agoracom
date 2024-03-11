import { combineReducers } from "redux";
import auth from "./User/Reducer";

const Reducers = combineReducers({
    auth,
});

export default Reducers;
