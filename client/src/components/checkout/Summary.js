import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
    Spinner,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import { removeAllProducts } from '../../store/actions/Products';
import { cleanOrderData } from '../../store/actions/OrderData';

const Summary = () => {
    const orderData = useSelector(state => state.orderData);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [responseText, setResponseText] = useState('');
    const dispatch = useDispatch();
    const toggle = () => setModal(!modal);

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
                    'http://localhost:3000/api/orders/newOrder',
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
                {isLoading && (
                    <Spinner color="primary" className="summary-spinner" />
                )}
            </div>
            <Modal isOpen={modal}>
                <ModalHeader>Thank You!</ModalHeader>
                <ModalBody>{responseText}</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={modalHandler}>
                        Go Home
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Summary;
