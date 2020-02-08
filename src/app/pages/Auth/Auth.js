import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom'

import Button from '../../tools/Button/Button';
import Spinner from '../../tools/Spinner/Spinner';
import Input from '../../tools/Input/Input';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        buttonContent: 'SIGN IN',
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: '',
                    placeholder: 'NickName'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            ConfirmEmail: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Confirm Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            ConfirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }

        },
        isSignup: false,
        email: false,
        passwor: false,
        formValid: false,
        signToggle: true,
        height: 300
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        const email = this.state.orderForm['email'].value;
        const password = this.state.orderForm['password'].value;
        const name = this.state.orderForm['name'].value;
        this.props.onAuth( email, password, name, this.state.isSignup );
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            if (this.state.signToggle){
                if(inputIdentifier == 'ConfirmEmail' || inputIdentifier == 'ConfirmPassword' || inputIdentifier == 'name'){
                    updatedOrderForm[inputIdentifier].valid = true;
                }
            }
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    selector = (e) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        for (let inputIdentifier in updatedOrderForm) {
            updatedOrderForm[inputIdentifier].value = '';
            updatedOrderForm[inputIdentifier].valid = false;
            updatedOrderForm[inputIdentifier].touched = false;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: false});

        this.refs.signINRef.style.color='#808080;';
        this.refs.signINRef.style.borderBottom='none';
        this.refs.signINRef.style.boxShadow= 'none';
        this.refs.signIN.style.color = '#808080';

        this.refs.signUPRef.style.color='#808080;';
        this.refs.signUPRef.style.borderBottom='none';
        this.refs.signUPRef.style.boxShadow= 'none';
        this.refs.signUP.style.color = '#808080';
        
        e.target.childNodes[0].style.borderBottom='2px solid rgb(26, 117, 255)';
        e.target.childNodes[0].style.boxShadow= '0px 0px 2px 1px rgb(26, 117, 255)';
        this.setState({buttonContent: e.target.childNodes[0].title});

        if (e.target.childNodes[0].title === 'SIGN IN') {
            this.refs.signIN.style.color = 'black';
            this.setState({isSignup: false, height: 300, signToggle: true});
        } else if (e.target.childNodes[0].title === 'SIGN UP'){
            this.refs.signUP.style.color = 'black';
            this.setState({isSignup: true, height: 400, signToggle: false});
        } 
    }

    render () {
        const formElementsArray = [];
        let redirect = null;
        for (let key in this.state.orderForm) {
            if(this.state.signToggle) {
                if(key == 'email' || key == 'password') {
                    formElementsArray.push({
                        id: key,
                        config: this.state.orderForm[key]
                    });
                }
            }else {
                formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                });
            }
            
            
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SIGN</Button>
            </form>
        );
        if(this.props.loading){
          form=(<Spinner />)
        }
        if(this.props.isAuthenticated) {
            redirect = (<Redirect to='/' />);
        }
        let errorMessage = null;
        if(this.props.error == true){
            errorMessage = (
                <p className={classes.MessageBox}>Login or Password incorrect.</p>
            );
        }
        return (
            <div className={classes.ContactData}>
                {redirect}
                <h4>Enter your Contact Data</h4>
                <div className={classes.selectorBox}>
                    <p ref={'signIN'} className={classes.signInP}>SIGN IN</p>
                    <p ref={'signUP'}>SIGN UP</p>
                </div>
                <div className={classes.toggle} ref={'divRef'} onClick={(e) => this.selector(e)}>
                    <div><div title="SIGN IN" ref={'signINRef'} className={classes.signIn}></div></div>
                    <div><div title="SIGN UP" ref={'signUPRef'}></div></div>
                </div>
                <div className={classes.line}></div>
                {form}
                {errorMessage}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        orderCreated: state.order.orderCreated
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, name, isSignup ) => dispatch( actions.auth( email, password, name, isSignup ) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
