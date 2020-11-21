import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    addProduct,
    removeProduct,
    eliminateProduct,
} from '../../store/actions/Products';

const Product2 = props => {
    const { id, name, price, image, quantity, measure } = props;

    const dispatch = useDispatch();
    return (
        <div className="order-product">
            <div className="order-image">
                <img
                    src={process.env.PUBLIC_URL + `images/products/${image}`}
                    alt="img"
                />
            </div>
            <div className="order-product-description">
                <p className="order-product-description-name">
                    <b>{name}</b>
                </p>
                <p className="order-product-description-price">
                    {measure}, {price}€/und.
                </p>
            </div>
            <div className="order-product-description-buttons">
                <button
                    type="button"
                    onClick={() => dispatch(removeProduct(id))}
                >
                    -
                </button>
                <div>{quantity}</div>
                <button type="button" onClick={() => dispatch(addProduct(id))}>
                    +
                </button>
            </div>
            <div className="order-product-price-total">
                {(price * quantity).toFixed(2)} €
            </div>
            <button
                className="order-product-eliminate"
                type="button"
                onClick={() => dispatch(eliminateProduct(id))}
            >
                X
            </button>
        </div>
    );
};

Product2.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    measure: PropTypes.string.isRequired,
};

export default Product2;
