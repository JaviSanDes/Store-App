import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Box from '../components/orders/box';
import OrderDetails from '../components/orders/OrderDetails';

const Orders = () => {
    const [isVisible, setIsVisible] = useState(true);
    const boxClose = () => setIsVisible(false);
    const boxOpen = () => setIsVisible(true);
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
                        viewOrder={boxOpen}
                    />
                ))}
            </div>
            {isVisible && <OrderDetails boxToggle={boxClose} />}
        </div>
    );
};

export default Orders;
