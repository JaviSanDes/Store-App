import * as actionTypes from '../actions/ActionTypes';

const initialState= {
  orderSummary: 0
}

const reducer= (state= initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_SUMARY_RESET:
      return {
        ...state,
        orderSummary: 0
      }
      case actionTypes.ORDER_SUMMARY_ADD:
        return {
          ...state,
          orderSummary: state.orderSummary+1
        }
      default: return state
}
}
export default reducer;
