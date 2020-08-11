/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { removeProduct, addProduct } from '../store/actions/Products';

const Buttons = props => {
    const { id, quantity } = props;

    const dispatch = useDispatch();
    return (
        <div className="buttons-add-button">
            <div
                role="button"
                id="buttons-add-button-1"
                className="avoid-modal"
                onClick={() => dispatch(removeProduct(id))}
            >
                -
            </div>
            <p className="avoid-modal">{quantity}</p>
            <div
                role="button"
                id="buttons-add-button-2"
                onClick={() => dispatch(addProduct(id))}
                className="avoid-modal"
            >
                +
            </div>
        </div>
    );
};

Buttons.propTypes = {
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
};

export default Buttons;
