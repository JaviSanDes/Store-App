import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import axios from 'axios';

const Settings = () => {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            const res = await axios.post(
                'http://localhost:3000/api/auth/userInfo',
                password
            );
            setForm({
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                password,
            });
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
                            onchange={passwordHandler}
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
                                onchange={formHandler}
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
                                onchange={formHandler}
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
                                onchange={formHandler}
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
                                onchange={formHandler}
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
                        <button type="button">Change Info</button>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default Settings;
