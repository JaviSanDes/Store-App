import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const ModalSettings = props => {
    const { modal, deleteAccModal, modalHandler, deleteAccountHandler } = props;
    return (
        <Modal isOpen={modal}>
            <ModalBody className="summary-modal-body">
                <div>
                    {deleteAccModal ? (
                        <p>Are your sore you want to delete the account</p>
                    ) : (
                        <p>Your data has been updated successfully</p>
                    )}
                </div>
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
                {!deleteAccModal ? (
                    <div>
                        <button type="button" onClick={modalHandler}>
                            Go Home
                        </button>
                    </div>
                ) : (
                    <button type="button" onClick={deleteAccountHandler}>
                        Delete Account
                    </button>
                )}
            </ModalFooter>
        </Modal>
    );
};

ModalSettings.propTypes = {
    modal: PropTypes.bool.isRequired,
    deleteAccModal: PropTypes.bool.isRequired,
    modalHandler: PropTypes.func.isRequired,
    deleteAccountHandler: PropTypes.func.isRequired,
};

export default ModalSettings;
