import React from 'react';

const CheckoutPhases = () => {
    return (
        <div className="checkout-phases-container">
            <div className="checkout-phases-line"></div>
            <div className="checkout-phases-circles">
                <div className="checkout-phase">
                    <div className="checkout-circle">1</div>
                    <p>Your Cart</p>
                </div>

                <div className="checkout-phase">
                    <div className="checkout-circle">2</div>
                    <p>Shipping</p>
                </div>
                <div className="checkout-phase">
                    <div className="checkout-circle">3</div>
                    <p>Payment</p>
                </div>
                <div className="checkout-phase">
                    <div className="checkout-circle">4</div>
                    <p>Summary</p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPhases;
