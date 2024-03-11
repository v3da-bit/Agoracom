import { SET_CURRENT_USER, SET_USER_LOGOUT } from "../Types";

const INIT_STATE = {
    currentUser: null,
    loggedIn: false
};

const defaultState = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: Object.assign({}, state.currentUser, action.payload),
                loggedIn: true
            };

        case SET_USER_LOGOUT:
            return {
                ...state,
                currentUser: Object.assign({}, INIT_STATE.currentUser),
                loggedIn: false
            };

        default:
            return state;
    }
};

export default defaultState;