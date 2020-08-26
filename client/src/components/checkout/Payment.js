import React from 'react';
import { Input, Label } from 'reactstrap';

const Payment = () => {
    return (
        <div className="payment-container">
            <h4 className="payment-price">Price: 345€</h4>
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
                    <Label for="examplePassword">Personal Details</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="First name"
                    />
                </div>
                <div>
                    <Label for="examplePassword">·</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Last name"
                    />
                </div>
            </div>
            <div className="payment-card-number">
                <Label for="examplePassword">Card number</Label>
                <Input
                    type="text"
                    name="password"
                    id="examplePassword"
                    placeholder="Enter full name"
                />
            </div>

            <div className="payment-card-details">
                <div>
                    <Label for="examplePassword">Expiration</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter full name"
                    />
                </div>
                <div>
                    <Label for="examplePassword">CVC Code</Label>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter full name"
                    />
                </div>
            </div>
        </div>
    );
};

export default Payment;
