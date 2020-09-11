import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Settings = () => {
    return (
        <div className="settings-container">
            <h4>Peronal Information</h4>
            <Form className="shipping-container">
                <FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Name</Label>
                        <Input
                            type="text"
                            name="password"
                            id="examplePassword"
                            placeholder="Jack Simon"
                            minlength="8"
                            required
                        />
                    </FormGroup>
                    <Label for="exampleSelect">Contry</Label>
                    <Input type="select" name="select">
                        <option>Spain</option>
                        <option>United Kingdom</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Italy</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Email</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="yourmail@mail.com"
                        minlength="8"
                        required
                    />
                </FormGroup>
                <button type="button" className="settings-changeInfo-button">
                    Change Info
                </button>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        minlength="8"
                        required
                    />
                </FormGroup>
                <button type="button">Change Password</button>
            </Form>
        </div>
    );
};

export default Settings;
