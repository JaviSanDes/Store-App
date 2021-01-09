import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Product from './Product';
import { confirmProducts } from '../../store/actions/OrderData';

const Order = props => {
    const { nextPhase } = props;
    const productsOrdered = useSelector(state => state.products.products);
    const userId = useSelector(state => state.auth.userId);
    const order = useSelector(state => state.products.order);
    const dispatch = useDispatch();
    const totalPrice = useSelector(state => state.products.totalPrice);

    const submitHandler = () => {
        const productsId = productsOrdered
            .filter(product => product.quantity > 0)
            .map(product => {
                return {
                    productID: product._id,
                    quantity: product.quantity,
                };
            });

        const price = {
            pvp: totalPrice.toFixed(2),
            total: ((totalPrice * 21) / 100 + totalPrice).toFixed(2),
        };
        const data = {
            products: productsId,
            price,
            userId,
        };
        dispatch(confirmProducts(data));
        nextPhase();
    };

    const products = [];
    order.map(id => {
        productsOrdered.map(product => {
            if (product._id === id && product.quantity > 0) {
                products.push(
                    <Product
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        group={product.group}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        quantity={product.quantity}
                        measure={product.measure}
                    />
                );
            }
            return null;
        });
        return null;
    });
    return (
        <div className="order-container">
            <div className="order-products">
                <div className="order-products-header">
                    <p className="order-products-header-description">
                        Description
                    </p>
                    <p className="order-products-header-qty">Qty</p>
                    <p className="order-products-header-X">Total</p>
                </div>

                <div className="order-products-list">{products}</div>
            </div>
            <div className="checkout-price">
                <div className="checkout-price-name">
                    <p>Sub-Total</p>
                    <p>VAT</p>
                    <h4>Total Price</h4>
                </div>
                <div>
                    <p>{totalPrice.toFixed(2)}€</p>
                    <p> {((totalPrice * 21) / 100).toFixed(2)}€</p>
                    <h4>
                        {((totalPrice * 21) / 100 + totalPrice).toFixed(2)}€
                    </h4>
                </div>
            </div>
            <div className="order-nexButton-box">
                <button
                    className="checkout-nextButton"
                    id="checkout-nextButton-id"
                    type="button"
                    onClick={submitHandler}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

Order.propTypes = {
    nextPhase: PropTypes.func.isRequired,
};

export default Order;
