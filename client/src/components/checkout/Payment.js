import React from 'react';
import { Input } from 'reactstrap';

const Payment = () => {
    return (
        <div className="payment-container">
            <h4>Price: 345€</h4>
            <p>Payment Method</p>
            <div className="payment-method">
                <div>Card</div>
                <div className="payment-method-2">Paypal</div>
                <div>Digital Wallet</div>
            </div>
            <div className="payment-card-details">
                <div>
                    <p>Personal Details</p>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter full name"
                    />
                </div>
                <div>
                    <p>df</p>
                    <Input
                        type="text"
                        name="password"
                        id="examplePassword"
                        placeholder="Enter full name"
                    />
                </div>
            </div>

            <p>Card number</p>
            <Input
                type="text"
                name="password"
                id="examplePassword"
                placeholder="Enter full name"
            />
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
