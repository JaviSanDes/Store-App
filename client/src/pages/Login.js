/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
// import { useDispatch } from 'react-redux';

const Login = () => {
    // const dispatch = useDispatch();
    const [validForm, setValidForm] = useState(false);
    const [isSignIn, setisSignIn] = useState(true);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
    });

    const submitHandler = e => {
        console.log(validForm);
        if (validForm) {
            e.preventDefault();
            console.log('VAA');
            // dispatch(shippingData(form));
        }
    };

    useEffect(() => {
        /*
        const input = document.getElementById('login-input-password');
        if (input !== null) {
            input.oninvalid = event => {
                event.target.setCustomValidity(
                    'Must contain at least 8 characters, one number, one uppercase and one lowercase letter.'
                );
            };
        }
        */
    }, [isSignIn]);

    useEffect(() => {
        const validator = () => {
            if (!isSignIn) {
                const isValidFirstName = form.firstName.length >= 3;
                const isValidLastName = form.lastName.lastName >= 3;
                const isValidPass =
                    form.password.length >= 8 &&
                    /\d/.test(form.password) &&
                    /[a-z]/.test(form.password) &&
                    /[A-Z]/.test(form.password);
                const isValidConfirPass =
                    form.confirmPassword === form.password;
                const isValidEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                    form.email
                );
                const isValidConfirmEmail = form.confirmEmail === form.email;

                if (
                    isValidFirstName &&
                    isValidLastName &&
                    isValidPass &&
                    isValidConfirPass &&
                    isValidConfirmEmail &&
                    isValidEmail
                ) {
                    console.log('TODOVALIDO');
                    setValidForm(true);
                }
            } else {
                console.log('ISVALIDMAIL');
                const isValidEmail = true;
                if (isValidEmail) setValidForm(true);
            }
        };

        validator();
    }, [form]);

    const handlerForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const switchHandler = e => {
        const elem1 = document.getElementById('login-switch-id-1');
        const elem2 = document.getElementById('login-switch-id-2');
        elem1.classList.remove('login-switch-style');
        elem2.classList.remove('login-switch-style');
        e.target.classList.add('login-switch-style');
        setisSignIn(f => !f);
    };

    const signUp = (
        <Form className="login-form">
            <FormGroup>
                <Label>First Name</Label>
                <Input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={handlerForm}
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
                    value={form.lastName}
                    onChange={handlerForm}
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
                    value={form.email}
                    onChange={handlerForm}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label>Confirm email</Label>
                <Input
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm your email"
                    pattern={form.email}
                    title="Must match the previous entry."
                    value={form.confirmEmail}
                    onChange={handlerForm}
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
                    value={form.password}
                    onChange={handlerForm}
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
                    value={form.confirmPassword}
                    onChange={handlerForm}
                    minLength="8"
                    pattern={form.password}
                    title="Must match the previous entry."
                    required
                />
            </FormGroup>
            <button onClick={e => submitHandler(e)} type="submit">
                LOGIN
            </button>
            <Spinner color="primary" className="login-spinner" />
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
                    value={form.email}
                    onChange={handlerForm}
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
                    value={form.password}
                    onChange={handlerForm}
                    required
                />
            </FormGroup>
            <button onClick={e => submitHandler(e)} type="submit">
                LOGIN
            </button>
            <Spinner color="primary" className="login-spinner" />
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
            {isSignIn ? signIn : signUp}
            {isSignIn && (
                <p className="login-forgot-passowrd">Forgot Password?</p>
            )}
        </div>
    );
};

export default Login;
