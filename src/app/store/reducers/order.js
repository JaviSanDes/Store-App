import * as actionTypes from '../actions/ActionTypes';

const initialState={
  orders: [],
  ordersHistory: [],
  orderCreated: false,
  totalPrice: 0,
  loading: false,
  purchaseSuccess: false
}

const RestartState= (state, action) => {
  return {
    ...state,
    orders: [],
    ordersHistory: [],
    orderCreated: false,
    totalPrice: 0,
    loading: false,
  }
}
const purchaseOrderStart = ( state, action ) => {
    return {
      ...state,
      loading: true
    }
};

const purchaseOrderSuccess = ( state, action ) => {
  return {
    ...state,
    loading: false,
    purchaseSuccess: action.value
  }
};

const purchaseOrderFail = ( state, action ) => {
    return {
       ...state,
       loading: false
    }
};

const fetchOrdersStart= (state, action) => {
  return {
    ...state,
    loading: true
  }
}

const fetchOrdersSuccess= (state, action) => {
  let orders = [...action.orders]
  return {
    ...state,
    ordersHistory: [...orders],
    loading: false
  }
}

const fetchOrdersFail= (state, action) => {
  return {
    ...state,
    loading: false
  }
}

const orderProduct= (state, action) => {
  let newOrder=[...state.orders];
  newOrder.unshift(action.result)
  return {
    ...state,
    orders: newOrder
  }
}

const addProduct= (state, action) => {
    let newStateAdd= [...state.orders]
    let newStateUpdateAdd= newStateAdd[action.id];
    newStateUpdateAdd.vezesComprado++;
    let valorSuma= newStateUpdateAdd.vezesComprado * newStateUpdateAdd.precio;
    newStateUpdateAdd.total= valorSuma
    newStateAdd[action.id]= newStateUpdateAdd
    let valorTotalAdd= state.totalPrice + newStateUpdateAdd.precio;
    return {
        ...state,
        orders: newStateAdd,
        totalPrice: valorTotalAdd
    }
}

const removeProduct = (state, action) => {
    let newStateRemove= [...state.orders];
    let stateUpdateRemove= newStateRemove[action.id];
    if(stateUpdateRemove.vezesComprado >= 1) {
        stateUpdateRemove.vezesComprado--;
        let valorResta= stateUpdateRemove.vezesComprado * stateUpdateRemove.precio;
        stateUpdateRemove.total= valorResta;
        newStateRemove[action.id]= stateUpdateRemove;
        let valorTotalRemove= state.totalPrice - stateUpdateRemove.precio;
        return {
            ...state,
            orders: newStateRemove,
            totalPrice: valorTotalRemove
        }
    }
}

const eliminateProduct = (state, action) => {
    let newOrders=[];
    state.orders.map(order=> newOrders.push(order))
    let priceProduct= newOrders[action.id].total;
    priceProduct= state.totalPrice - priceProduct;
    newOrders[action.id].vezesComprado = 0;
    newOrders.splice(action.id, 1);
    return {
        ...state,
        orders: newOrders,
        totalPrice: priceProduct
    }
}

const sendOrder = (state, action) => {
    return {
        ...state,
        orderCreated: true
    }
}

const reducer= ( state= initialState, action ) => {
  switch(action.type){
      case actionTypes.ORDER_PRODUCT: return orderProduct(state, action);
      case actionTypes.ADD_PRODUCT: return addProduct(state, action);
      case actionTypes.REMOVE_PRODUCT: return removeProduct(state, action);
      case actionTypes.ELIMINATE_PRODUCT: return eliminateProduct(state, action);
      case actionTypes.SEND_ORDER: return sendOrder(state, action);
      case actionTypes.PURCHASE_ORDER_START: return purchaseOrderStart(state, action);
      case actionTypes.PURCHASE_ORDER_SUCCESS: return purchaseOrderSuccess(state, action);
      case actionTypes.PURCHASE_ORDER_FAIL: return purchaseOrderFail(state, action);
      case actionTypes.INITIAL_STATE: return RestartState(state, action);
      case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
      case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
      case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
      case actionTypes.ORDER_SUCCESS_TOGGLE: return orderSuccessToggle();

      default: return state
  }
}

export default reducer;
