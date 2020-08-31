import React from 'react';
import { Input, Label } from 'reactstrap';

const Payment = () => {
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
                        name="name"
                        id="name"
                        placeholder="First name"
                        minLength="3"
                        required
                    />
                </div>
                <div>
                    <Label for="lastName">·</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="examplePassword"
                        placeholder="Last name"
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
                        required
                    />
                </div>
                <div>
                    <Label for="cvc">CVC Code</Label>
                    <Input
                        type="number"
                        name="cvc"
                        id="cvc"
                        placeholder="Enter CVC Code"
                        maxLength="3"
                        minLength="3"
                        required
                    />
                </div>
            </div>
            <input
                className="payment-submitButton"
                type="submit"
                value="Submit"
            ></input>
        </form>
    );
};

export default Payment;
