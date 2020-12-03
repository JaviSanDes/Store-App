import { CONFIRM_ORDER_PRODUCTS, CONFIRM_SHIPPING_DATA } from '../actionTypes';

const initialState = {
    products: {},
    shippingData: {},
    paymentData: {},
};

const orderData = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRM_ORDER_PRODUCTS:
            return {
                products: { ...action.payload },
            };
        case CONFIRM_SHIPPING_DATA:
            return {
                shippingData: { ...action.payload },
            };
        default:
            return state;
    }
};

export default orderData;
