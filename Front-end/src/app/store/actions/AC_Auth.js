import axios from 'axios';
import * as actionTypes from './ActionTypes';
import Cookies from "js-cookie"

export const authStart= () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess= (token, userID, userName) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userID: userID,
    userName: userName
  }
}

export const authError= (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error
  }
}

export const logOut= () => {
  Cookies.remove('token', { path: '' });
  Cookies.remove('userId', { path: '' });
  Cookies.remove('userName', { path: '' });
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const auth= (email, password, name, isSignup) => {
  return dispatch => {
      dispatch(authStart());
      let authData = null;
      isSignup ? authData= {
                  email: email,
                  password: password,
                  name: name
                } :
                authData= {
                  email: email,
                  password: password
                }
      let url= null;
      isSignup ? url= 'https://boiling-escarpment-88964.herokuapp.com/api/users' : url= 'https://boiling-escarpment-88964.herokuapp.com/api/auth';
      axios.post(url, authData)
        .then(response => {
            let name = response.data.name;
            let id = response.data._id;
            let token = Object.entries(response.headers)[1];
            token = token[1];
            Cookies.set('token', token);
            Cookies.set('userId', id);
            Cookies.set('touserNameken', name);
            dispatch(authSuccess(token, id, name));
        })
        .catch(error => {
            dispatch(authError(error.response.data.error));
        });
  };
};


export const authCheckState = () => {
    return dispatch => {
        const token = Cookies.get('token');
        if (token) {
          const userId = Cookies.get('userId');
          const userName = Cookies.get('userName');
          dispatch(authSuccess(token, userId, userName));
        }
    };
};
