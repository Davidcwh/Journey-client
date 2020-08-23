import { combineReducers } from 'redux';
import actionTypes from './actions/actionTypes';

const defaultUser = {
    isLoggedIn: false,
    isVerified: false
}

const userReducer = (state=defaultUser, action) => {
    const newUser = { ...state };

    switch(action.type) {
        case actionTypes.USER.SET_IS_LOGGED_IN:
            newUser.isLoggedIn = action.payload;
            break;

        case actionTypes.USER.SET_IS_VERIFIED:
            newUser.isVerified = action.payload;
            break;

        case actionTypes.USER.USER_LOG_OUT:
            newUser.isLoggedIn = false;
            newUser.isVerified = false;
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