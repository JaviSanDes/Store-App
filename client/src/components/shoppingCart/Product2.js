import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Buttons from '../Buttons';
import { eliminateProduct } from '../../store/actions/Products';

const Product2 = props => {
    const { id, name, price, image, quantity, measure } = props;

    const dispatch = useDispatch();
    return (
        <div className="shoppingCart-product">
            <div className="shoppingCart-image">
                <img
                    src={process.env.PUBLIC_URL + `images/products/${image}`}
                    alt="img"
                />
            </div>
            <div className="shoppingCart-product-description">
                <p>
                    <b>{name}</b>
                </p>
                <p>
                    {measure}, {price}€/und.
                </p>
                <div className="shoppingCart-product-buttons">
                    <Buttons id={id} quantity={quantity} />
                </div>
            </div>

            <h1 className="shoppingCart-product-price-total">
                {(price * quantity).toFixed(2)} €
            </h1>
            <button
                className="shoppingCart-product-eliminate"
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
