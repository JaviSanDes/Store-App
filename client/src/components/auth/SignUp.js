import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

const SignUp = props => {
    const { signUpForm, signUpFormHandler, submitHandler, isLoading } = props;
    return (
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
                    type="password"
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
};

SignUp.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    signUpForm: PropTypes.object.isRequired,
    signUpFormHandler: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default SignUp;
