import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const Summary = () => {
    const orderData = useSelector(state => state.orderData);
    const payHandler = async () => {
        const token = Cookies.get('token');
        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            };
            try {
                const res = await axios.post(
                    'http://localhost:3000/api/orders/newOrder',
                    orderData,
                    { headers }
                );
                console.log(res);
            } catch (error) {
                console.log('ERROR!!!');
            }
        }
    };
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
                    onClick={payHandler}
                >
                    Pay
                </button>
            </div>
        </div>
    );
};

export default Summary;
