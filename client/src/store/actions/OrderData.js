import * as actionType from '../actionTypes';

export const confirmProducts = products => ({
    type: actionType.CONFIRM_ORDER_PRODUCTS,
    payload: products,
});

export const shippingData = data => ({
    type: actionType.CONFIRM_SHIPPING_DATA,
    payload: data,
});
