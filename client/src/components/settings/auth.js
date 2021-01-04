import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Spinner } from 'reactstrap';

const Auth = props => {
    const {
        displayError,
        errorMsg,
        setDisplayError,
        password,
        passwordHandler,
        nextButtonHandler,
        isLoading,
    } = props;

    return (
        <div className="settings-auth">
            <h4 className="settings-title">Introduce Password</h4>
            {displayError && (
                <div className="login-errorBox">
                    <span>{errorMsg}</span>
                    <span role="click" onClick={() => setDisplayError(false)}>
                        X
                    </span>
                </div>
            )}
            <FormGroup>
                <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    value={password}
                    onChange={passwordHandler}
                    required
                />
            </FormGroup>
            <button type="button" onClick={nextButtonHandler}>
                Next
            </button>
            {isLoading && <Spinner color="primary" />}
        </div>
    );
};

Auth.propTypes = {
    displayError: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    setDisplayError: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    passwordHandler: PropTypes.func.isRequired,
    nextButtonHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default Auth;
