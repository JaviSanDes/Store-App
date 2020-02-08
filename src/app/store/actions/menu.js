import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const getProductStart= () => {
  return {
    type: actionTypes.LOADING_PRODUCTS
  }
}

export const setProducts= (payload) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    payload: payload
  }
}

export const getProducts= () => {
  return dispatch => {
    dispatch(getProductStart());
    let payload = null;
    axios.get('https://boiling-escarpment-88964.herokuapp.com/api/alimentos')
        .then( response => {
            payload = [...response.data];
            dispatch(setProducts(payload));
        } )
        .catch( error => {
            console.log("error")
        } );
    };
}

export const menuSelected= (payload) => {
  return {
    type: actionTypes.MENU_SELECTED,
    payload: payload
  }
}

export const getMenuSelectedProducts= (selected) => {
  return dispatch => {
    dispatch(getProductStart());
    let payload = null;
    axios.get('https://boiling-escarpment-88964.herokuapp.com/api/alimentos/selected',  {params: {foo: selected}})
        .then( response => {
            payload = [...response.data];
            dispatch(menuSelected(payload));
        } )
        .catch( error => {
            dispatch( purchaseOrderFail( error ) );
        } );
    };
}

export const searchProduct = (payload) => {
  return {
    type: actionTypes.SEARCH_PRODUCT,
    payload: payload
  }
}

export const getSearchProduct= (selected) => {
  return dispatch => {
    dispatch(getProductStart());
    let payload = null;
    axios.get('https://boiling-escarpment-88964.herokuapp.com/api/alimentos/search',  {params: {foo: selected}})
        .then( response => {
              payload = [...response.data];
              dispatch(searchProduct(payload));
        } )
        .catch( error => {
            dispatch( purchaseOrderFail( error ) );
        } );
    };
}
