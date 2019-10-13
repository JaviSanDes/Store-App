import * as actionTypes from './ActionTypes';
import axios from 'axios';


export const initialState= () =>   {
  return {
    type: actionTypes.INITIAL_STATE
  }
}

export const sendOrder= (token) => {
  return {
    type: actionTypes.SEND_ORDER,
    token:token
  }
}

export const purchaseOrderSuccess = (value) => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        value: value
    };
};

export const purchaseOrderFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAIL,
        error: error
    };
}

export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START
    };
};

export const purchaseOrder = ( orderData, token) => { 
    return dispatch => {
        dispatch( purchaseOrderStart() );
        let headers = {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
        axios.post('https://boiling-escarpment-88964.herokuapp.com/api/order', orderData, {headers: headers})
            .then( response => {
                dispatch(initialState());
                dispatch(purchaseOrderSuccess(true));
            })
            .catch( error => {
                dispatch( purchaseOrderFail( error ) );
            } );
    };
};

export const fetchOrdersStart= () =>{
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersSuccess= (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail= (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        let headers = {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
        axios.get( 'https://boiling-escarpment-88964.herokuapp.com/api/order', {headers: headers, params: {id: userId}})
            .then( res => {
                const fetchedOrders = [...res.data];
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};
