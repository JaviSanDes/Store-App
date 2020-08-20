import React from 'react';

const Payment = () => {
    return (
        <div className="payment-container">
            <h1>payment</h1>
            <p>Payment Method</p>
            <div className="payment-method">
                <div>Card</div>
                <div>Paypal</div>
                <div>Digital Wallet</div>
            </div>
            <p>Card number</p>
            <input></input>
            <p>Expiration</p>
            <input></input>
            <p>CVC Code</p>
            <input></input>
        </div>
    );
};

export default Payment;
