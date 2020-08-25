import React from 'react';
import { Input } from 'reactstrap';

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
                <div>Digital Wallet</div>
            </div>
            <div className="payment-card-details">
                <div>
                    <p>Personal Details</p>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="First name"
                    />
                </div>
                <div>
                    <p>df</p>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Last name"
                    />
                </div>
            </div>
            <div className="payment-card-number">
                <p>Card number</p>
                <Input
                    type="text"
                    name="password"
                    id="examplePassword"
                    placeholder="Enter full name"
                />
            </div>

            <div className="payment-card-details">
                <div>
                    <p>Expiration</p>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter full name"
                    />
                </div>
                <div>
                    <p>CVC Code</p>
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
