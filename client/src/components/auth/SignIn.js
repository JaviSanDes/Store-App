import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

const SignIn = props => {
    const { signInForm, signInFormHandler, submitHandler, isLoading } = props;
    return (
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
};

SignIn.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    signInForm: PropTypes.object.isRequired,
    signInFormHandler: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default SignIn;
