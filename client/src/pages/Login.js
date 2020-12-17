/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { signInSuccess } from '../store/actions/auth';

const Login = () => {
    const dispatch = useDispatch();
    const [validForm, setValidForm] = useState(false);
    const [isSignIn, setisSignIn] = useState('login-switch-id-1');
    const [isLoading, setIsLoading] = useState(false);
    const [displayError, setDisplayError] = useState(false);
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
            const data = isSignIn ? signInForm : signUpForm;
            const url = isSignIn
                ? 'http://localhost:3000/api/auth/signIn'
                : 'http://localhost:3000/api/auth/signUp';
            try {
                const res = await axios.post(url, data);
                const { name, _id } = res.data;
                const token = res.headers.x_auth_token;
                Cookies.set('token', token);
                dispatch(signInSuccess(token, _id, name));
                setIsLoading(false);
            } catch {
                setDisplayError(true);
            }
        }
    };

    useEffect(() => {
        const validator = () => {
            if (isSignIn === 'login-switch-id-2') {
                const isValidFirstName = signUpForm.firstName.length >= 3;
                const isValidLastName = signUpForm.lastName.lastName >= 3;
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
                }
            } else {
                const isValidEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                    signInForm.email
                );
                if (isValidEmail) setValidForm(true);
            }
        };

        validator();
    }, [signInForm, signUpForm]);

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
    };

    const signUp = (
        <Form className="login-form">
            <FormGroup>
                <Label>First Name</Label>
                <Input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={signUpForm.firstName}
                    onChange={signUpFormHandler}
                    minLength="3"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Last Name</Label>
                <Input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={signUpForm.lastName}
                    onChange={signUpFormHandler}
                    minLength="3"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Your email</Label>
                <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="'characters@characters.domain'"
                    value={signUpForm.email}
                    onChange={signUpFormHandler}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Confirm email</Label>
                <Input
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm your email"
                    pattern={signUpForm.email}
                    title="Must match the previous entry."
                    value={signUpForm.confirmEmail}
                    onChange={signUpFormHandler}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Your password</Label>
                <Input
                    type="password"
                    name="password"
                    id="login-input-password"
                    placeholder="Enter your Password"
                    value={signUpForm.password}
                    onChange={signUpFormHandler}
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Confirm password</Label>
                <Input
                    type="text"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={signUpForm.confirmPassword}
                    onChange={signUpFormHandler}
                    minLength="8"
                    pattern={signUpForm.password}
                    title="Must match the previous entry."
                    required
                />
            </FormGroup>
            <button onClick={e => submitHandler(e)} type="submit">
                CREATE ACCOUNT
            </button>
            {isLoading && <Spinner color="primary" className="login-spinner" />}
        </Form>
    );

    const signIn = (
        <Form className="login-form">
            <FormGroup>
                <Label for="email">Your email</Label>
                <Input
                    type="email"
                    name="email"
                    id="login-input-email"
                    placeholder="Enter your email"
                    value={signInForm.email}
                    onChange={signInFormHandler}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="'characters@characters.domain'"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Your password</Label>
                <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={signInForm.password}
                    onChange={signInFormHandler}
                    required
                />
            </FormGroup>
            <button onClick={e => submitHandler(e)} type="submit">
                LOGIN
            </button>
            {isLoading && <Spinner color="primary" className="login-spinner" />}
        </Form>
    );

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
                    <span>Incorrect email or password.</span>
                    <span role="click" onClick={() => setDisplayError(false)}>
                        X
                    </span>
                </div>
            )}

            {isSignIn === 'login-switch-id-1' ? signIn : signUp}
            {isSignIn === 'login-switch-id-1' && (
                <p className="login-forgot-passowrd">Forgot Password?</p>
            )}
        </div>
    );
};

export default Login;
