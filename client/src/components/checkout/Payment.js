import React from 'react';

const Payment = () => {
    return (
        <div className="payment-container">
            <h1>payment</h1>
            <h4>Price: 345€</h4>
            <p>Payment Method</p>
            <div className="payment-method">
                <div>Card</div>
                <div className="payment-method-2">Paypal</div>
                <div>Digital Wallet</div>
            </div>
            <p>Card number</p>
            <input></input>
            <div className="payment-card-details">
                <div>
                    <p>Expiration</p>
                    <input></input>
                </div>
                <div>
                    <p>CVC Code</p>
                    <input></input>
                </div>
            </div>
        </div>
    );
};

export default Payment;
