import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Shipping = () => {
    return (
        <div className="shipping-container">
            <Form>
                <FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Full Name</Label>
                        <Input
                            type="text"
                            name="password"
                            id="examplePassword"
                            placeholder="Enter full name"
                        />
                    </FormGroup>
                    <Label for="exampleSelect">Contry</Label>
                    <Input type="select" name="select" id="exampleSelect">
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
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">ZIP Code</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter full name"
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Phone Number</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Current address..."
                    />
                </FormGroup>
            </Form>
        </div>
    );
};

export default Shipping;
