import * as actionType from '../actionTypes';

export const confirmProducts = data => ({
    type: actionType.CONFIRM_ORDER_PRODUCTS,
    payload: data,
});

export const shippingData = data => ({
    type: actionType.CONFIRM_SHIPPING_DATA,
    payload: data,
});

export const paymentData = data => ({
    type: actionType.CONFIRM_PAYMENT_DATA,
    payload: data,
});
