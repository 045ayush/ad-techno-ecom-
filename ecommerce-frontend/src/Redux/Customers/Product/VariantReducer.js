// productsReducer.js
import {
    DELETE_VARIANT_FAILURE,DELETE_VARIANT_REQUEST,DELETE_VARIANT_SUCCESS
  } from './ActionType';
  
  const initialState = {
    loading: false,
    error: null,
  };
  
  const variantsReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_VARIANT_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_VARIANT_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case DELETE_VARIANT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default variantsReducer;
  