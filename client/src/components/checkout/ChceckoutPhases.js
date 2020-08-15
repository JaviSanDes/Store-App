import React from 'react';

const CheckoutPhases = () => {
    return (
        <div className="checkout-phases-container">
            <div className="checkout-phases-line"></div>
            <div className="checkout-phases-circles">
                <div className="checkout-phase">
                    <div className="checkout-circle"></div>
                    <p>phase 1</p>
                </div>

                <div className="checkout-phase">
                    <div className="checkout-circle"></div>
                    <p>phase 2</p>
                </div>
                <div className="checkout-phase">
                    <div className="checkout-circle"></div>
                    <p>phase 3</p>
                </div>
                <div className="checkout-phase">
                    <div className="checkout-circle"></div>
                    <p>phase 4</p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPhases;
