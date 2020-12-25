import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Settings = () => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const _id = useSelector(state => state.auth.userId);
    const [isDataVisible, setIsDataVisible] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const passwordHandler = e => {
        setPassword(e.target.value);
    };

    const formHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const nextButtonHandler = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/user/me', {
                password,
                _id,
            });
            setForm({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                password,
            });
            setIsLoading(false);
            setIsDataVisible(true);
        } catch {
            console.log('error');
        }
    };

    const changeInfoHandler = async () => {
        setIsLoading(true);
        try {
            const res = await axios.put(
                `http://localhost:3000/api/user/${_id}`,
                form
            );
            console.log(res);
            setIsLoading(false);
            setIsDataVisible(true);
        } catch {
            console.log('error');
        }
    };

    return (
        <div>
            {!isDataVisible ? (
                <div className="settings-auth">
                    <h4 className="settings-title">Introduce Password</h4>
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
                    <h4 className="settings-title">Peronal Information</h4>
                    <Form className="shipping-container">
                        <FormGroup>
                            <Label for="examplePassword">First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="examplePassword"
                                value={form.firstName}
                                minlength="8"
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
                                minlength="8"
                                onChange={formHandler}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Email</Label>
                            <Input
                                type="text"
                                name="email"
                                id="examplePassword"
                                value={form.email}
                                minlength="8"
                                onChange={formHandler}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                value={form.password}
                                minlength="8"
                                onChange={formHandler}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                                Confirm Password
                            </Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                minlength="8"
                                required
                            />
                        </FormGroup>
                        <button type="button" onClick={changeInfoHandler}>
                            Change Info
                        </button>
                        {isLoading && <Spinner color="primary" />}
                    </Form>
                </div>
            )}
        </div>
    );
};

export default Settings;
