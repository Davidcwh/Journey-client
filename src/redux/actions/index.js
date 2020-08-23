import actionTypes from './actionTypes';

export const setIsAuthenticated = (bool) => {
    return {
        type: actionTypes.USER.SET_IS_AUTHENTICATED,
        payload: bool
    }
} 