import actionTypes from './actionTypes';

export const setIsLoggedIn = (bool) => {
    return {
        type: actionTypes.USER.SET_IS_LOGGED_IN,
        payload: bool
    }
}

export const setIsVerified = (bool) => {
    return {
        type: actionTypes.USER.SET_IS_VERIFIED,
        payload: bool
    }
}

export const userLogOut = (bool) => {
    return {
        type: actionTypes.USER.USER_LOG_OUT
    }
}

// Action creators - for dispatching multiple actions at once
export const verifiedUserLogIn = () => {
    return dispatch => {
        dispatch(setIsLoggedIn(true));
        dispatch(setIsVerified(true));
    }
}