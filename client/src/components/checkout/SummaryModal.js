import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const SummaryModal = props => {
    const { modal, responseText, modalHandler } = props;
    return (
        <Modal isOpen={modal}>
            <ModalBody className="summary-modal-body">
                <div>{responseText}</div>
                <div>
                    <svg
                        className="checkmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                    >
                        <circle
                            className="checkmark__circle"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                        />
                        <path
                            className="checkmark__check"
                            fill="none"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                    </svg>
                </div>
            </ModalBody>
            <ModalFooter className="summary-modal-footer">
                <button onClick={modalHandler} type="button">
                    Go Home
                </button>{' '}
            </ModalFooter>
        </Modal>
    );
};

SummaryModal.propTypes = {
    modal: PropTypes.func.isRequired,
    responseText: PropTypes.string.isRequired,
    modalHandler: PropTypes.func.isRequired,
};

export default SummaryModal;
