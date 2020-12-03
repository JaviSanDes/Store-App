import { CONFIRM_ORDER_PRODUCTS } from '../actionTypes';

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
        default:
            return state;
    }
};

export default orderData;
