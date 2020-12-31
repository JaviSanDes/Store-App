/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Spinner,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Settings = () => {
    const [password, setPassword] = useState('');
    const [validForm, setValidForm] = useState(false);
    const [validPassForm, setValidPassForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteAccModal, setDeleteAccModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const history = useHistory();
    const _id = useSelector(state => state.auth.userId);
    const [isDataVisible, setIsDataVisible] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [passwordForm, setPasswordForm] = useState({
        password: '',
        confirmPassword: '',
    });

    const toggle = () => setModal(!modal);

    const passwordHandler = e => setPassword(e.target.value);

    const nextButtonHandler = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/user/me', {
                password,
                _id,
            });
            setForm({
                ...form,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
            });
            setIsLoading(false);
            setIsDataVisible(true);
        } catch (error) {
            setIsLoading(false);
            setDisplayError(true);
            setErrorMsg(error.response.data);
        }
    };

    useEffect(() => {
        const validator = () => {
            const isValidFirstName = form.firstName.length >= 3;
            const isValidLastName = form.lastName.length >= 3;
            const isValidEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                form.email
            );
            console.log(
                isValidFirstName,
                isValidLastName,
                isValidEmail,
                validForm
            );
            if (isValidFirstName && isValidLastName && isValidEmail) {
                setValidForm(true);
            } else {
                setValidForm(false);
            }
        };

        validator();
    }, [form]);

    useEffect(() => {
        const validator = () => {
            const isValidPass =
                passwordForm.password.length >= 8 &&
                /\d/.test(passwordForm.password) &&
                /[a-z]/.test(passwordForm.password) &&
                /[A-Z]/.test(passwordForm.password);
            const isValidConfirPass =
                passwordForm.confirmPassword === passwordForm.password;

            isValidPass && isValidConfirPass
                ? setValidPassForm(true)
                : setValidPassForm(false);
        };

        validator();
    }, [passwordForm]);

    const formHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const passwordFormHandler = e => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    };

    const changeInfoHandler = async e => {
        if (validForm) {
            e.preventDefault();
            setIsLoading(true);
            try {
                const res = await axios.put(
                    `http://localhost:3000/api/user/${_id}`,
                    { ...form, password }
                );
                console.log(res);
                setIsLoading(false);
                setIsDataVisible(true);
                toggle();
            } catch (error) {
                setIsLoading(false);
                setDisplayError(true);
                setErrorMsg(error.response.data);
            }
        }
    };

    const changePasswordHandler = async e => {
        if (validPassForm) {
            e.preventDefault();
            setIsLoading(true);
            try {
                const res = await axios.put(
                    `http://localhost:3000/api/user/${_id}`,
                    { ...form, password: passwordForm.password }
                );
                console.log(res);
                setIsLoading(false);
                setIsDataVisible(true);
                toggle();
            } catch (error) {
                setDisplayError(true);
                setIsLoading(false);
                setErrorMsg(error.response.data);
            }
        }
    };

    const deleteAccountHandler = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:3000/api/user/${_id}`
            );
            console.log(res);
            setIsLoading(false);
            setIsDataVisible(true);
            toggle();
            history.push('/');
        } catch (error) {
            setDisplayError(true);
            setIsLoading(false);
            setErrorMsg(error.response.data);
        }
    };

    const modalHandler = () => history.push('/');

    const switchModal = () => {
        toggle();
        setDeleteAccModal(true);
    };

    return (
        <div>
            {!isDataVisible ? (
                <div className="settings-auth">
                    <h4 className="settings-title">Introduce Password</h4>
                    {displayError && (
                        <div className="login-errorBox">
                            <span>{errorMsg}</span>
                            <span
                                role="click"
                                onClick={() => setDisplayError(false)}
                            >
                                X
                            </span>
                        </div>
                    )}
                    <FormGroup>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            value={password}
                            onChange={passwordHandler}
                            required
                        />
                    </FormGroup>
                    <button type="button" onClick={nextButtonHandler}>
                        Next
                    </button>
                    {isLoading && <Spinner color="primary" />}
                </div>
            ) : (
                <div className="settings-container">
                    <h4 className="settings-title">Personal Information</h4>
                    {displayError && (
                        <div className="login-errorBox">
                            <span>{errorMsg}</span>
                            <span
                                role="click"
                                onClick={() => setDisplayError(false)}
                            >
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
                            <Spinner
                                color="primary"
                                className="settings-spinner"
                            />
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
                            <Label for="examplePassword">
                                Confirm Password
                            </Label>
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
                            <Spinner
                                color="primary"
                                className="settings-spinner"
                            />
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
            )}

            <Modal isOpen={modal}>
                <ModalBody className="summary-modal-body">
                    <div>
                        {deleteAccModal ? (
                            <p>Are your sore you want to delete the account</p>
                        ) : (
                            <p>Your data has been updated successfully</p>
                        )}
                    </div>
                    <div>
                        <svg
                            className="checkmark"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 52 52"
                        >
                            <circle
                                className="checkmark__circle"
                                cx="26"
                                cy="26"
                                r="25"
                                fill="none"
                            />
                            <path
                                className="checkmark__check"
                                fill="none"
                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                            />
                        </svg>
                    </div>
                </ModalBody>
                <ModalFooter className="summary-modal-footer">
                    {!deleteAccModal ? (
                        <div>
                            <button type="button" onClick={modalHandler}>
                                Go Home
                            </button>
                        </div>
                    ) : (
                        <button type="button" onClick={deleteAccountHandler}>
                            Delete Account
                        </button>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Settings;
