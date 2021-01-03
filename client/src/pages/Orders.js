import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Progress } from 'reactstrap';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Box from '../components/orders/box';
import OrderItems from '../components/orders/OrderItems';

const Orders = () => {
    const [isVisible, setIsVisible] = useState(true);
    const boxToggle = () => setIsVisible(Visible => !Visible);
    const userId = useSelector(state => state.auth.userId);
    const [orders, setOrders] = useState([]);

    const handleUserKeyPress = useCallback(() => {
        const box = document.getElementById('prueba');
        const up = document.getElementById('prueba2');
        const down = document.getElementById('prueba3');
        const result = box.offsetHeight - up.offsetHeight;
        down.style.height = `${result - 40}px`;
    }, []);

    useEffect(async () => {
        try {
            const token = Cookies.get('token');
            const headers = {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            };
            const req = await Axios.post(
                'http://localhost:3000/api/orders',
                {
                    userId,
                },
                { headers }
            );
            setOrders([...req.data]);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleUserKeyPress);
        handleUserKeyPress();
        return () => {
            window.removeEventListener('resize', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return (
        <div className="orders-container">
            <div className="orders-ordersList">
                <h4>My Orders</h4>
                {orders.map((order, i) => (
                    <Box
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        price={order.price.total}
                        date={order.dateOrder}
                        viewOrder={boxToggle}
                    />
                ))}
            </div>
            {isVisible && (
                <div className="orders-orderDetails" id="prueba">
                    <div className="orders-orderDetails-up" id="prueba2">
                        <div className="orders-orderDetails-title">
                            <h4>Order Details</h4>
                            <button onClick={boxToggle} type="button">
                                X
                            </button>
                        </div>
                        <div className="orders-delivery-info">
                            <div className="orders-delivery-info-1">
                                <div>
                                    <p>Delivery Address:</p>
                                    <p>Order Date: </p>
                                    <p>Delivery Time: </p>
                                </div>
                                <div>
                                    <p>
                                        1865 Chenoweth Drive, Nashville,
                                        Tennessee
                                    </p>
                                    <p>7th April 2019</p>
                                    <p>13th April</p>
                                </div>
                            </div>
                            <div className="orders-delivery-info-2">
                                <div>
                                    <p>Sub Total</p>
                                    <p>Delivery Fee</p>
                                    <p>Total</p>
                                </div>
                                <div>
                                    <p>$279</p>
                                    <p>$39</p>
                                    <p>$318</p>
                                </div>
                            </div>
                        </div>
                        <div className="orders-deliveryStatus">
                            <div className="orders-steps">
                                <div className="orders-circle orders-ticked">
                                    <img
                                        src={
                                            process.env.PUBLIC_URL +
                                            'images/tick2.png'
                                        }
                                        className="orders-tick"
                                        alt="img"
                                    />
                                </div>
                                <div className="orders-circle orders-ticked">
                                    <img
                                        src={
                                            process.env.PUBLIC_URL +
                                            'images/tick2.png'
                                        }
                                        className="orders-tick"
                                        alt="img"
                                    />
                                </div>
                                <div className="orders-circle">3</div>
                            </div>
                            <Progress value={50} className="orders-progress" />
                            <div className="orders-steps">
                                <p>Order Recived</p>
                                <p>Order On The Way</p>
                                <p>Order Delivered</p>
                            </div>
                        </div>
                    </div>

                    <div className="orders-orderDetails-down" id="prueba3">
                        <OrderItems />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
