import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

const Settings = props => {
    const {
        displayError,
        errorMsg,
        setDisplayError,
        form,
        formHandler,
        changeInfoHandler,
        isLoading,
        passwordForm,
        passwordFormHandler,
        changePasswordHandler,
        switchModal,
    } = props;

    return (
        <div className="settings-container">
            <h4 className="settings-title">Personal Information</h4>
            {displayError && (
                <div className="login-errorBox">
                    <span>{errorMsg}</span>
                    <span role="click" onClick={() => setDisplayError(false)}>
                        X
                    </span>
                </div>
            )}
            <Form className="shipping-container">
                <FormGroup>
                    <Label for="examplePassword">First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        id="examplePassword"
                        value={form.firstName}
                        minlength="3"
                        onChange={formHandler}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="examplePassword"
                        value={form.lastName}
                        minlength="3"
                        onChange={formHandler}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="examplePassword"
                        value={form.email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        onChange={formHandler}
                        required
                    />
                </FormGroup>
                <button type="submit" onClick={changeInfoHandler}>
                    Change Info
                </button>
                {isLoading && (
                    <Spinner color="primary" className="settings-spinner" />
                )}
            </Form>
            <Form className="shipping-container">
                <FormGroup>
                    <Label for="examplePassword">New Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        value={passwordForm.password}
                        minLength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        onChange={passwordFormHandler}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Confirm Password</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="examplePassword"
                        minLength="8"
                        value={passwordForm.confirmPassword}
                        pattern={passwordForm.password}
                        title="Must match the previous entry."
                        onChange={passwordFormHandler}
                        required
                    />
                </FormGroup>
                <button type="submit" onClick={changePasswordHandler}>
                    Change Password
                </button>
                {isLoading && (
                    <Spinner color="primary" className="settings-spinner" />
                )}
            </Form>
            <button
                type="button"
                className="settings-deleteButton"
                onClick={switchModal}
            >
                Delete Account
            </button>
        </div>
    );
};

Settings.propTypes = {
    displayError: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    setDisplayError: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    form: PropTypes.object.isRequired,
    formHandler: PropTypes.func.isRequired,
    changeInfoHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    passwordForm: PropTypes.object.isRequired,
    passwordFormHandler: PropTypes.func.isRequired,
    changePasswordHandler: PropTypes.func.isRequired,
    switchModal: PropTypes.func.isRequired,
};

export default Settings;
