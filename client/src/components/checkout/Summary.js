import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Spinner } from 'reactstrap';
import { removeAllProducts } from '../../store/actions/Products';
import { cleanOrderData } from '../../store/actions/OrderData';
import SummaryModal from './SummaryModal';
import { api } from '../../helpers/constants';

const Summary = () => {
    const orderData = useSelector(state => state.orderData);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [responseText, setResponseText] = useState('');
    const dispatch = useDispatch();
    const toggle = () => setModal(!modal);
    const cardNUmber = orderData.paymentData.cardNumber;
    const lasChars = cardNUmber.substr(
        cardNUmber.length - 3,
        cardNUmber.length
    );
    const payHandler = async () => {
        setIsLoading(true);
        const token = Cookies.get('token');
        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            };
            try {
                const res = await axios.post(
                    `${api}/orders/newOrder`,
                    orderData,
                    { headers }
                );
                // eslint-disable-next-line no-console
                console.log(res);
                setResponseText(res.data);
                setIsLoading(false);
                toggle();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
                setIsLoading(false);
            }
        }
    };

    const modalHandler = () => {
        dispatch(cleanOrderData());
        dispatch(removeAllProducts());
        history.push('/');
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
                        <h6>{orderData.price.pvp} €</h6>
                    </div>
                    <div>
                        <p>VAT</p>
                        <h6>{orderData.price.total - orderData.price.pvp} €</h6>
                    </div>
                    <div>
                        <p>Total Price</p>
                        <h6 id="summary-total-price-id">
                            {orderData.price.total} €
                        </h6>
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
                    <p>{orderData.shippingData.address}</p>
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
                    <h6>**** **** **** *{lasChars}</h6>
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
                {isLoading && (
                    <Spinner color="primary" className="summary-spinner" />
                )}
            </div>
            <SummaryModal
                modal={modal}
                responseText={responseText}
                modalHandler={modalHandler}
            />
        </div>
    );
};

export default Summary;
