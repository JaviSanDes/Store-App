import * as actionType from '../actionTypes';

const initialState = {
    token: null,
    userId: null,
    name: null,
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.idToken,
        userId: action.userID,
        name: action.userName,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_SUCCESS:
            return authSuccess(state, action);
        default:
            return state;
    }
};
export default reducer;
