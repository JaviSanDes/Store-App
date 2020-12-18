import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetNotifications } from '../../store/actions/Products';

import Product2 from './Product2';

const ShoppingCart = () => {
    const [toggle, setToggle] = useState(365);
    const token = useSelector(state => state.auth.token);
    const history = useHistory();
    const productsOrdered = useSelector(state => state.products.products);
    const order = useSelector(state => state.products.order);
    const newProductsNotification = useSelector(
        state => state.products.newProducts
    );
    const dispatch = useDispatch();
    const totalPrice = useSelector(state => state.products.totalPrice);

    const clickHandler = () => {
        if (window.innerWidth < 600) {
            toggle === 70 ? setToggle(365) : setToggle(70);
        } else {
            toggle === 0 ? setToggle(365) : setToggle(0);
        }

        dispatch(resetNotifications());
    };

    const checkoutHandler = () => {
        token ? history.push('/checkout') : history.push('/login');
    };

    const products = [];
    order.map(id => {
        productsOrdered.map(product => {
            if (product._id === id && product.quantity > 0) {
                products.push(
                    <Product2
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
        <div
            style={{ transform: `translateX(${toggle}px)` }}
            className="shoppingCart-container"
        >
            <p className="shoppingCart-header-totalItems">
                total items: {products.length}
            </p>
            <div className="shoppingCart-header">
                <button
                    className="shoppingCart-toggle"
                    onClick={clickHandler}
                    type="button"
                >
                    {toggle === 0 ? (
                        <p className="shoppingCart-x">X</p>
                    ) : (
                        <div>
                            <img
                                src={
                                    process.env.PUBLIC_URL + 'images/trolly.png'
                                }
                                className="shoppingCart-header-img-trolly"
                                alt="img"
                            />
                            {newProductsNotification === 0 ? null : (
                                <div className="shoppingCart-header-notification">
                                    {newProductsNotification}
                                </div>
                            )}
                        </div>
                    )}
                </button>
            </div>
            <div className="shoppingCart-list">{products}</div>
            <div className="shoppingCart-footer">
                <p className="shoppingCart-footer-totalPrice">
                    Total {totalPrice.toFixed(2)} €
                </p>
                <button
                    className="shoppingCart-checkout"
                    type="button"
                    onClick={checkoutHandler}
                >
                    CHECKOUT
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;
