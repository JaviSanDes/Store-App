import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Shipping = () => {
    return (
        <Form className="shipping-container">
            <FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Full Name</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter full name"
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
                <Label for="examplePassword">Address</Label>
                <Input
                    type="text"
                    name="password"
                    id="examplePassword"
                    placeholder="Current address..."
                    minlength="8"
                    required
                />
            </FormGroup>

            <FormGroup>
                <Label for="examplePassword">ZIP Code</Label>
                <Input
                    type="text"
                    name="password"
                    id="examplePassword"
                    placeholder="Enter full name"
                    minLength="5"
                    maxLength="5"
                />
            </FormGroup>

            <FormGroup>
                <Label for="examplePassword">Phone Number</Label>
                <Input
                    type="number"
                    name="password"
                    id="examplePassword"
                    placeholder="Current address..."
                />
            </FormGroup>
            <input type="submit" value="Submit"></input>
        </Form>
    );
};

export default Shipping;
