import React from 'react';

const Summary = () => {
    return (
        <div className="summary-container">
            <div className="summary-box">
                <div className="summary-imageBox">
                    <h1>€</h1>
                </div>
                <div className="summary-price">
                    <div>
                        <p>Price</p>
                        <h6>103.45 €</h6>
                    </div>
                    <div>
                        <p>VAT</p>
                        <h6>103.45 €</h6>
                    </div>
                    <div>
                        <p>Total Price</p>
                        <h6 id="summary-total-price-id">103.45 €</h6>
                    </div>
                </div>
            </div>
            <div className="summary-box">
                <div className="summary-imageBox">
                    <img
                        src={process.env.PUBLIC_URL + 'images/delivery2.png'}
                        alt="img"
                        width="50px"
                    />
                </div>
                <div>
                    <p>Delivery Address:</p>
                    <p>Paseo santxiki 19 bajo a mutilva</p>
                </div>
            </div>
            <div className="summary-box">
                <div className="summary-imageBox">
                    <img
                        src={process.env.PUBLIC_URL + 'images/creditCard.png'}
                        alt="img"
                        width="40px"
                    />
                </div>
                <div>
                    <p>Card Number ends in:</p>
                    <h6>**** **** **** *234</h6>
                </div>
            </div>
            <div className="summary-pay">
                <button
                    type="submit"
                    id="checkout-pay-id"
                    className="checkout-nextButton"
                >
                    Pay
                </button>
            </div>
        </div>
    );
};

export default Summary;
