import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import OrderItems from './OrderItems';

const OrderDetails = props => {
    const { boxToggle, orderInfo } = props;
    const {
        DeliveryAddress,
        OrderDate,
        DeliveryTime,
        SubTotal,
        DeliveryFee,
        Total,
        products,
    } = orderInfo;
    console.log(products);
    return (
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
                            <p>{DeliveryAddress}</p>
                            <p>{OrderDate}</p>
                            <p>{DeliveryTime}</p>
                        </div>
                    </div>
                    <div className="orders-delivery-info-2">
                        <div>
                            <p>Sub Total</p>
                            <p>Delivery Fee</p>
                            <p>Total</p>
                        </div>
                        <div>
                            <p>{SubTotal}</p>
                            <p>{DeliveryFee}</p>
                            <p>{Total}</p>
                        </div>
                    </div>
                </div>
                <div className="orders-deliveryStatus">
                    <div className="orders-steps">
                        <div className="orders-circle orders-ticked">
                            <img
                                src={
                                    process.env.PUBLIC_URL + 'images/tick2.png'
                                }
                                className="orders-tick"
                                alt="img"
                            />
                        </div>
                        <div className="orders-circle orders-ticked">
                            <img
                                src={
                                    process.env.PUBLIC_URL + 'images/tick2.png'
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
                <OrderItems products={products} />
            </div>
        </div>
    );
};

OrderDetails.propTypes = {
    boxToggle: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    orderInfo: PropTypes.object.isRequired,
};

export default OrderDetails;
