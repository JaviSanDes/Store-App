import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { shippingData } from '../../store/actions/OrderData';

const Shipping = props => {
    const { submit } = props;
    const [validForm, setValidForm] = useState(false);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        contry: '',
        address: '',
        zipCode: '',
        phone: '',
    });
    const submitHandler = e => {
        if (validForm) {
            e.preventDefault();
            dispatch(shippingData(form));
            submit();
        }
    };

    const validator = () => {
        const isValidName = form.name.length >= 8;
        const isValidAdress = form.address.length >= 8;
        const isValidZipCode = form.zipCode.length === 4;

        if (isValidName && isValidAdress && isValidZipCode) setValidForm(true);
    };

    const handlerForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        validator();
    };

    return (
        <Form className="shipping-container">
            <FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Full Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="examplePassword"
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={handlerForm}
                        minLength="8"
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
                    name="address"
                    id="examplePassword"
                    placeholder="Current address..."
                    value={form.address}
                    onChange={handlerForm}
                    minlength="8"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">ZIP Code</Label>
                <Input
                    type="text"
                    name="zipCode"
                    id="examplePassword"
                    placeholder="Enter full name"
                    value={form.zipCode}
                    onChange={handlerForm}
                    minLength="5"
                    maxLength="5"
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Phone Number</Label>
                <Input
                    type="number"
                    name="phone"
                    id="examplePassword"
                    placeholder="Current address..."
                    value={form.phone}
                    onChange={handlerForm}
                />
            </FormGroup>
            <button
                type="submit"
                id="shipping-submit-button"
                onClick={e => submitHandler(e)}
            >
                NEXT
            </button>
        </Form>
    );
};

Shipping.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default Shipping;
