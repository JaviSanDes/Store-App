/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { signInSuccess } from '../store/actions/auth';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';

const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [validForm, setValidForm] = useState(false);
    const [isSignIn, setisSignIn] = useState('login-switch-id-1');
    const [isLoading, setIsLoading] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [signInForm, setSignInForm] = useState({
        password: '',
        email: '',
    });
    const [signUpForm, setSignUpForm] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
    });

    const submitHandler = async e => {
        if (validForm) {
            e.preventDefault();
            setIsLoading(true);
            const data =
                isSignIn === 'login-switch-id-1'
                    ? signInForm
                    : {
                          firstName: signUpForm.firstName,
                          lastName: signUpForm.lastName,
                          password: signUpForm.password,
                          email: signUpForm.email,
                      };
            const url =
                isSignIn === 'login-switch-id-1'
                    ? 'http://localhost:3000/api/auth'
                    : 'http://localhost:3000/api/user';
            try {
                const res = await axios.post(url, data);
                const { firstName, lastName, email, _id, token } = res.data;
                Cookies.set('token', token);
                dispatch(signInSuccess(token, firstName, lastName, email, _id));
                setIsLoading(false);
                history.push('/');
            } catch (error) {
                setIsLoading(false);
                setDisplayError(true);
                setErrorMsg(error.response.data);
            }
        }
    };

    useEffect(() => {
        const validator = () => {
            if (isSignIn === 'login-switch-id-2') {
                const isValidFirstName = signUpForm.firstName.length >= 3;
                const isValidLastName = signUpForm.lastName.length >= 3;
                const isValidPass =
                    signUpForm.password.length >= 8 &&
                    /\d/.test(signUpForm.password) &&
                    /[a-z]/.test(signUpForm.password) &&
                    /[A-Z]/.test(signUpForm.password);
                const isValidConfirPass =
                    signUpForm.confirmPassword === signUpForm.password;
                const isValidEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                    signUpForm.email
                );
                const isValidConfirmEmail =
                    signUpForm.confirmEmail === signUpForm.email;
                if (
                    isValidFirstName &&
                    isValidLastName &&
                    isValidPass &&
                    isValidConfirPass &&
                    isValidConfirmEmail &&
                    isValidEmail
                ) {
                    setValidForm(true);
                } else {
                    setValidForm(false);
                }
            } else {
                const isValidEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                    signInForm.email
                );
                isValidEmail ? setValidForm(true) : setValidForm(false);
            }
        };

        validator();
    }, [signInForm, signUpForm, isSignIn]);

    const signInFormHandler = e => {
        setSignInForm({
            ...signInForm,
            [e.target.name]: e.target.value,
        });
    };

    const signUpFormHandler = e => {
        setSignUpForm({
            ...signUpForm,
            [e.target.name]: e.target.value,
        });
    };

    const switchHandler = e => {
        const elem1 = document.getElementById('login-switch-id-1');
        const elem2 = document.getElementById('login-switch-id-2');
        elem1.classList.remove('login-switch-style');
        elem2.classList.remove('login-switch-style');
        e.target.classList.add('login-switch-style');
        setisSignIn(e.target.id);
        setSignInForm({
            password: '',
            email: '',
        });
        setSignUpForm({
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            email: '',
            confirmEmail: '',
        });
    };

    return (
        <div className="login-container">
            <div className="login-switch">
                <h3
                    id="login-switch-id-1"
                    className="login-switch-title login-switch-style"
                    onClick={switchHandler}
                >
                    Sign in
                </h3>
                <h3
                    id="login-switch-id-2"
                    className="login-switch-title"
                    onClick={switchHandler}
                >
                    Sign up
                </h3>
            </div>
            {displayError && (
                <div className="login-errorBox">
                    <span>{errorMsg}</span>
                    <span role="button" onClick={() => setDisplayError(false)}>
                        X
                    </span>
                </div>
            )}

            {isSignIn === 'login-switch-id-1' ? (
                <SignIn
                    signInForm={signInForm}
                    signInFormHandler={e => signInFormHandler(e)}
                    submitHandler={e => submitHandler(e)}
                    isLoading={isLoading}
                />
            ) : (
                <SignUp
                    signUpForm={signUpForm}
                    signUpFormHandler={() => signUpFormHandler()}
                    submitHandler={() => submitHandler()}
                    isLoading={isLoading}
                />
            )}
            {isSignIn === 'login-switch-id-1' && (
                <p className="login-forgot-passowrd">Forgot Password?</p>
            )}
        </div>
    );
};

export default Auth;
