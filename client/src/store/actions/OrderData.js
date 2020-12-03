import * as actionType from '../actionTypes';

export const confirmProducts = products => ({
    type: actionType.CONFIRM_ORDER_PRODUCTS,
    payload: products,
});
