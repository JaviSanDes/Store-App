import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Product from './Product';
import { confirmProducts } from '../../store/actions/OrderData';

const Order = props => {
    const { nextPhase } = props;
    const productsOrdered = useSelector(state => state.products.products);
    const order = useSelector(state => state.products.order);
    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(confirmProducts(productsOrdered));
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
            <button
                className="checkout-nextButton"
                type="button"
                onClick={submitHandler}
            >
                Next
            </button>
        </div>
    );
};

Order.propTypes = {
    nextPhase: PropTypes.func.isRequired,
};

export default Order;
