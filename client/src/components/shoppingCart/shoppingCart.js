import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetNotifications } from '../../store/actions/Products';

import Product2 from './Product2';

const ShoppingCart = () => {
    const [toggle, setToggle] = useState(350);
    const productsOrdered = useSelector(state => state.products.products);
    const order = useSelector(state => state.products.order);
    const newProductsNotification = useSelector(
        state => state.products.newProducts
    );
    const dispatch = useDispatch();
    const totalPrice = useSelector(state => state.products.totalPrice);

    const clickHandler = () => {
        toggle === 0 ? setToggle(350) : setToggle(0);
        dispatch(resetNotifications());
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
                        <p>X</p>
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
                <button className="shoppingCart-checkout" type="button">
                    CHECKOUT
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;
