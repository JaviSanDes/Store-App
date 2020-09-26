import React from 'react';
import { Progress } from 'reactstrap';
import Box from '../components/orders/box';
import OrderItems from '../components/orders/OrderItems';

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
                <div className="orders-orderDitail"></div>
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
                    <OrderItems />
                </div>
            </div>
        </div>
    );
};

export default Orders;
