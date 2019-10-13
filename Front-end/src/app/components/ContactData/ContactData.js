import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import { withRouter } from 'react-router-dom';

import Button from '../../tools/Button/Button';
import Spinner from '../../tools/Spinner/Spinner';
import Input from '../../tools/Input/Input';
import classes from './ContactData.css';

import OrderSucces from '../OrderSucces/OrderSucces';

class ContactData extends Component {
    state = {
        orderForm: {
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 9,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        orderSuccessBox: false
    }
    componentDidMount() {
        this.setState({orderSuccessBox: false})
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const products= this.props.products.map(product => {
            return {
                vezesComprado: product.vezesComprado,
                productID: product._id
            }
        })
        const order = {
            products: products,
            orderData: formData,
            customerId: this.props.userId
        }
        this.props.onOrder(order, this.props.token, this.props.userId);
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
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    redirectHome = () => {
        this.setState({orderSuccessBox: false});
        this.props.history.push('/');
    }
    purchaseSuccess = (value) => {
        this.setState({orderSuccessBox: true});
        this.props.onPurchaseSuccess(value);
    }
   
    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                <h4>Enter your Contact Data</h4>
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
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
          form=(<Spinner />)
        }
        if(this.props.purchaseSuccess || this.state.orderSuccessBox) { 
            form = (
                <OrderSucces 
                    reloadHome={() => this.redirectHome()}
                    purchaseSuccess={(value) => this.purchaseSuccess(value)}
                />
            ) 
        }
        return (
            <div className={classes.ContactData}>
                {form}    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        products: state.order.orders,
        totalPrice: state.order.totalPrice,
        loading: state.order.loading,
        purchaseSuccess: state.order.purchaseSuccess
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData, token) => dispatch(actions.purchaseOrder(orderData, token)),
        onPurchaseSuccess: (value) => dispatch(actions.purchaseOrderSuccess(value))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactData, axios));
