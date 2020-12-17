import * as actionType from '../actionTypes';

export const signInSuccess = (token, userID, userName) => {
    return {
        type: actionType.SIGN_IN_SUCCESS,
        idToken: token,
        userID,
        userName,
    };
};
