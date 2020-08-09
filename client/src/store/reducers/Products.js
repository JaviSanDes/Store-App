import {
    LOADING_ERROR,
    LOADING_IN_PROGRESS,
    SET_PRODUCTS,
  } from "../actions/actionTypes";
  
  const initialState = {
    isLoading: false,
    hasErrored: false,
    products: [],
    order: [],
    newProducts: 0,
    totalPrice: 0,
  };
  
  const setProducts = (state, action) => {
    const products = state.products.map((product) => ({ ...product })); // CLONE ARRAY OF OBJECTS
    const newProducts = action.products;
    for (const property in newProducts) {
      if ({}.hasOwnProperty.call(newProducts, property)) {
        if (
          !products.some((product) => product._id === newProducts[property]._id)
        ) {
          products.push({ ...newProducts[property] });
        }
      }
    }
    return {
      ...state,
      isLoading: false,
      products: [...products],
    };
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOADING_ERROR:
        return {
          ...state,
        };
      case LOADING_IN_PROGRESS:
        return {
          ...state,
          isLoading: true,
        };
      case SET_PRODUCTS:
        return setProducts(state, action);
      default:
        return state;
    }
  };
  
  export default productReducer;
  