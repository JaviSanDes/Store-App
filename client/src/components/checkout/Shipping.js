import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Shipping = () => {
    return (
        <div className="shipping-container">
            <Form>
                <FormGroup>
                    <Label for="exampleSelect">Contry</Label>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Full Name</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter full name"
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
                    <Label for="examplePassword">Address</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Current address..."
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
                <Button>Submit</Button>
            </Form>
        </div>
    );
};

export default Shipping;
