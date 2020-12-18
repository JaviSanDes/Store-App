import Cookies from 'js-cookie';
import axios from 'axios';
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

export const authCheckState = () => {
    return async dispatch => {
        const token = Cookies.get('token');
        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            };
            try {
                const res = await axios.post(
                    'http://localhost:3000/api/auth/verifyToken',
                    null,
                    { headers }
                );
                const { firstName, lastName, email, _id } = res.data;
                dispatch(signInSuccess(token, firstName, lastName, email, _id));
            } catch (error) {
                Cookies.remove('token', { path: '' });
                // dispatch(authError(error.response.data));
            }
        }
    };
};
