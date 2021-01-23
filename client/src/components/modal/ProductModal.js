import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from './Slider';
import Buttons from '../Buttons';
import { addProduct } from '../../store/actions/Products';

const ProductModal = props => {
    const {
        id,
        name,
        measure,
        description,
        price,
        image,
        isvisible,
        setVisible,
        quantity,
        group,
        offer,
    } = props;
    const toggle = () => setVisible();
    const dispatch = useDispatch();

    return (
        <Modal isOpen={isvisible} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle} />
            <ModalBody>
                <div className="modal-body">
                    <Slider image={image} />
                    <div className="modal-body-info">
                        <div className="modal-body-info-nameOffer">
                            <h1 className="modal-body-info-name">{name}</h1>
                            {offer > 0 ? (
                                <div className="modal-offer">{offer}%</div>
                            ) : null}
                        </div>

                        <p>{measure}</p>
                        <div className="modal-body-info-text">
                            {description}
                            <br />
                            <br />
                            <p className="modal-tag">{group}</p>
                        </div>
                        <div className="modal-product-price">
                            <p className="product-price-value">{price} €</p>
                            {quantity > 0 ? (
                                <Buttons id={id} quantity={quantity} />
                            ) : (
                                <div
                                    role="button"
                                    id="product-price-button"
                                    className="avoid-modal"
                                    onClick={() => dispatch(addProduct(id))}
                                >
                                    Add to Cart
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

ProductModal.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    measure: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isvisible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    quantity: PropTypes.number.isRequired,
    group: PropTypes.string.isRequired,
    offer: PropTypes.number.isRequired,
};

export default ProductModal;
