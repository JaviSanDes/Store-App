/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Auth from '../components/settings/Auth';
import SettingsForm from '../components/settings/SettingsForm';

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
                <Auth
                    displayError={displayError}
                    errorMsg={errorMsg}
                    setDisplayError={setDisplayError}
                    password={password}
                    passwordHandler={passwordHandler}
                    nextButtonHandler={nextButtonHandler}
                    isLoading={isLoading}
                />
            ) : (
                <SettingsForm
                    displayError={displayError}
                    errorMsg={errorMsg}
                    setDisplayError={setDisplayError}
                    form={form}
                    formHandler={formHandler}
                    changeInfoHandler={changeInfoHandler}
                    isLoading={isLoading}
                    passwordForm={passwordForm}
                    passwordFormHandler={passwordFormHandler}
                    changePasswordHandler={changePasswordHandler}
                    switchModal={switchModal}
                />
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
