import * as actionType from '../actionTypes';

export const signInSuccess = (token, firstName, lastName, email, _id) => {
    return {
        type: actionType.SIGN_IN_SUCCESS,
        idToken: token,
        userID: _id,
        firstName,
        lastName,
        email,
    };
};
