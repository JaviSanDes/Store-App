import * as actionType from '../actionTypes';

export const authSuccess = (token, userID, userName) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userID,
        userName,
    };
};
