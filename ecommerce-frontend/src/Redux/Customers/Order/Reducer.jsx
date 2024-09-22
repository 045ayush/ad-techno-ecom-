import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    FETCH_ORDER_HISTORY_REQUEST,
    FETCH_ORDER_HISTORY_SUCCESS,
    FETCH_ORDER_HISTORY_FAILURE,
    FETCH_ORDER_BY_ID_REQUEST,
    FETCH_ORDER_BY_ID_SUCCESS,
    FETCH_ORDER_BY_ID_FAILURE,
  } from './ActionType';
  
  const initialState = {
    loading: false,
    order: null,
    orderHistory: [],
    error: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
      case FETCH_ORDER_HISTORY_REQUEST:
      case FETCH_ORDER_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          order: action.payload,
        };
  
      case FETCH_ORDER_HISTORY_SUCCESS:
        return {
          ...state,
          loading: false,
          orderHistory: action.payload,
        };
  
      case FETCH_ORDER_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          order: action.payload,
        };
  
      case CREATE_ORDER_FAILURE:
      case FETCH_ORDER_HISTORY_FAILURE:
      case FETCH_ORDER_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  