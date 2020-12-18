import * as actionType from '../actionTypes';

const initialState = {
    token: null,
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
};

const signInSuccess = (state, action) => {
    return {
        ...state,
        token: action.idToken,
        userId: action.userID,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SIGN_IN_SUCCESS:
            return signInSuccess(state, action);
        default:
            return state;
    }
};
export default reducer;
