import {
    CREATE_PAYMENT_LINK_REQUEST,
    CREATE_PAYMENT_LINK_SUCCESS,
    CREATE_PAYMENT_LINK_FAILURE,
    UPDATE_PAYMENT_INFORMATION_REQUEST,
    UPDATE_PAYMENT_INFORMATION_SUCCESS,
    UPDATE_PAYMENT_INFORMATION_FAILURE,
  } from './ActionType';
  
  const initialState = {
    paymentloading: false,
    paymentLink: null,
    paymentUpdateMessage: null,
    paymenerror: null,
  };
  
  // Reducer to handle payment-related actions
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PAYMENT_LINK_REQUEST:
      case UPDATE_PAYMENT_INFORMATION_REQUEST:
        return {
          ...state,
          paymentloading: true,
          paymenerror: null,
        };
  
      case CREATE_PAYMENT_LINK_SUCCESS:
        return {
          ...state,
          paymentloading: false,
          paymentLink: action.payload,
          paymenerror: null,
        };
  
      case CREATE_PAYMENT_LINK_FAILURE:
        return {
          ...state,
          paymentloading: false,
          paymenerror: action.payload,
        };
  
      case UPDATE_PAYMENT_INFORMATION_SUCCESS:
        return {
          ...state,
          paymentloading: false,
          paymentUpdateMessage: action.payload.message,
          paymenerror: null,
        };
  
      case UPDATE_PAYMENT_INFORMATION_FAILURE:
        return {
          ...state,
          paymentloading: false,
          paymenerror: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default paymentReducer;
  