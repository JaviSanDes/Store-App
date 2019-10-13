import * as actionTypes from '../actions/ActionTypes';

const initialState={
    alimentos: [],
    loading: false
  }

const getProductStart = (state, action) => {
  return {
    loading: true
  }
}
  const setProducts= (state, action) => {
    let alimentosTotal = [...action.payload];
    return {
      ...state,
      loading: false,
      alimentos: [...alimentosTotal]
    }
  }
  const menuSelected= (state, action) => {
    let alimentos = [...action.payload];
    return {
      ...state,
      loading: false,
      alimentos: [...alimentos]
    }
  }
  const productSearched = (state, action) => {
    let alimentos = [...action.payload];
    return {
      ...state,
      loading: false,
      alimentos: [...alimentos]
    }
  }


  const reducer= (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.MENU_SELECTED: return menuSelected(state, action)
        case actionTypes.SET_PRODUCTS: return setProducts(state, action)
        case actionTypes.SEARCH_PRODUCT: return productSearched(state, action)
        case actionTypes.LOADING_PRODUCTS: return getProductStart(state, action)
        default: return state
    }
  }
  export default reducer;