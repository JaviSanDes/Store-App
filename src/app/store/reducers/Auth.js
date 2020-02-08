import * as actionTypes from '../actions/ActionTypes';


const initialState = {
    token: null,
    userId: null,
    error: null,
    nombre: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart= (state, action) => {
  return {
    ...state,
      error: null,
      loading: true
  }
}

const authSuccess= (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userID,
    nombre: action.userName,
    error: null,
    loading: false
  }
}


const authError= (state, action) => {
  return {
    ...state,
    error: true,
    loading: false
  }
}
const authLogOut= (state, action) => {
  return {
    ...state,
    token: null,
    userId: null
  }
}
const reducer= (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_ERROR: return authError(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogOut(state, action);

    default: return state
  }
}
export default reducer;
