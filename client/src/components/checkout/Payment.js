import React, { useEffect, useState } from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { paymentData } from '../../store/actions/OrderData';

const Payment = props => {
    const { submit, backHandler } = props;
    const [validForm, setValidForm] = useState(false);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        paymentMethod: 'card',
        firstName: '',
        lastName: '',
        cardNumber: '',
        expiration: '',
        cvcCode: '',
    });

    // expected input dd/mm/yyyy or dd.mm.yyyy or dd-mm-yyyy
    function isValidDate(s) {
        const separators = ['\\.', '\\-', '\\/'];
        const bits = s.split(new RegExp(separators.join('|'), 'g'));
        const d = new Date(bits[0], bits[1] - 1, bits[2]);
        return (
            d.getFullYear() === parseInt(bits[0], 10) &&
            d.getMonth() + 1 === parseInt(bits[1], 10)
        );
    }

    useEffect(() => {
        const validator = () => {
            const isValidFirstName = form.firstName.length >= 3;
            const isValidLastName = form.lastName.length >= 3;
            const isValidCardNumber = form.cardNumber.length === 12;
            const isValidExpiration = isValidDate(form.expiration);
            const isValidCvcCode = form.cvcCode.length === 3;
            if (
                isValidFirstName &&
                isValidLastName &&
                isValidCardNumber &&
                isValidExpiration &&
                isValidCvcCode
            )
                setValidForm(true);
        };
        validator();
    }, [form]);

    const submitHandler = e => {
        if (validForm) {
            e.preventDefault();
            dispatch(paymentData(form));
            submit();
        }
    };

    const handlerForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form className="payment-container">
            <p className="payment-method-title">Payment Method</p>
            <div className="payment-method">
                <div>
                    <img
                        alt="img"
                        src={process.env.PUBLIC_URL + 'images/creditCard.png'}
                    />
                </div>
                <div className="payment-method-2">
                    <img
                        alt="img"
                        src={process.env.PUBLIC_URL + 'images/paypal.png'}
                    />
                </div>
                <div>
                    <img
                        alt="img"
                        src={process.env.PUBLIC_URL + 'images/e-wallet.png'}
                    />
                </div>
            </div>
            <div className="payment-card-details">
                <div>
                    <Label for="name">Personal Details</Label>
                    <Input
                        type="text"
                        name="firstName"
                        id="name"
                        placeholder="First name"
                        minLength="3"
                        value={form.firstName}
                        onChange={handlerForm}
                        required
                    />
                </div>
                <div>
                    <Label for="lastName" className="payment-dot">
                        ·
                    </Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="examplePassword"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={handlerForm}
                        minLength="3"
                        required
                    />
                </div>
            </div>
            <div className="payment-card-number">
                <Label for="cardNumber">Card number</Label>
                <Input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="Enter card number"
                    value={form.cardNumber}
                    onChange={handlerForm}
                    minLength="12"
                    maxLength="12"
                    required
                />
            </div>

            <div className="payment-card-details">
                <div>
                    <Label for="expiration">Expiration</Label>
                    <Input
                        type="date"
                        name="expiration"
                        id="expiration"
                        placeholder="Date of expiration"
                        value={form.expiration}
                        onChange={handlerForm}
                        required
                    />
                </div>
                <div>
                    <Label for="cvc" className="payment-cvc">
                        CVC Code
                    </Label>
                    <Input
                        type="number"
                        name="cvcCode"
                        id="cvc"
                        placeholder="Enter CVC Code"
                        value={form.cvcCode}
                        onChange={handlerForm}
                        maxLength="3"
                        minLength="3"
                        required
                    />
                </div>
            </div>
            <div className="checkout-nextBack-buttons">
                <button
                    type="submit"
                    id="checkout-backButton-id"
                    className="checkout-nextButton"
                    onClick={e => backHandler(e)}
                >
                    Back
                </button>
                <button
                    type="submit"
                    id="checkout-nextButton-id"
                    className="checkout-nextButton"
                    onClick={e => submitHandler(e)}
                >
                    Next
                </button>
            </div>
        </form>
    );
};

Payment.propTypes = {
    submit: PropTypes.func.isRequired,
    backHandler: PropTypes.func.isRequired,
};

export default Payment;
