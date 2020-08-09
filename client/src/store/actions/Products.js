import axios from 'axios';
import * as actionType from './actionTypes';

export const loadingError = bool => ({
    type: actionType.LOADING_ERROR,
    hasErrored: bool,
});

export const loadingInProgress = bool => ({
    type: actionType.LOADING_IN_PROGRESS,
    isLoading: bool,
});

export const setProducts = data => ({
    type: actionType.SET_PRODUCTS,
    products: data,
});

export function getProducts(group) {
    return async dispatch => {
        dispatch(loadingError(false));
        dispatch(loadingInProgress(true));
        const result = await axios.get(
            `https://e-commerce-mernapp.herokuapp.com/api/products/${group}`
        );
        dispatch(setProducts({ ...result.data }));
    };
}
