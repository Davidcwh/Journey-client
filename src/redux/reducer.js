import { combineReducers } from 'redux';
import actionTypes from './actions/actionTypes';

const defaultUser = {
    isAuthenticated: false
}

const userReducer = (state=defaultUser, action) => {
    const newUser = { ...state }

    switch(action.type) {
        case actionTypes.USER.SET_IS_AUTHENTICATED:
            newUser.isAuthenticated = action.payload;
            break;

        default:
            break;
    }

    return newUser;
}

const uiReducer = (state={}, action) => {
    const newUi = { ...state };

    return newUi
}

const dataReducer = (state={}, action) => {
    const newData = { ...state };

    return newData;
}

export default combineReducers({
    user: userReducer,
    ui: uiReducer,
    data: dataReducer
})