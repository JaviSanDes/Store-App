import React from 'react';
import { Progress } from 'reactstrap';
import Box from '../components/order/box';
import Order from '../components/checkout/Order';

const Orders = () => {
    return (
        <div className="orders-container">
            <div className="orders-ordersList">
                <h4>My Orders</h4>
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
                <Box />
            </div>
            <div className="orders-orderDetails">
                <h4>Order Details</h4>
                <div className="orders-steps">
                    <div className="orders-circle orders-ticked">
                        <img
                            src={process.env.PUBLIC_URL + 'images/tick2.png'}
                            className="orders-tick"
                            alt="img"
                        />
                    </div>
                    <div className="orders-circle orders-ticked">
                        <img
                            src={process.env.PUBLIC_URL + 'images/tick2.png'}
                            className="orders-tick"
                            alt="img"
                        />
                    </div>
                    <div className="orders-circle">3</div>
                </div>
                <Progress value={50} className="orders-progress" />
                <div className="orders-orderProducts">
                    <Order />
                </div>
            </div>
        </div>
    );
};

export default Orders;
