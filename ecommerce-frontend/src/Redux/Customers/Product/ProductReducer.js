// productsReducer.js
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCTS_DETAILS_REQUEST,
  FETCH_PRODUCTS_DETAILS_SUCCESS,
  FETCH_PRODUCTS_DETAILS_FAILURE
} from './ActionType';

const initialState = {
  loading: false,
  product: null,
  products: [],
  currentPage: 1,
  totalPages: 1,
  error: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case FETCH_PRODUCTS_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
    case FETCH_PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.content,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case FETCH_PRODUCTS_FAILURE:
    case FETCH_PRODUCTS_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        error: null,
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        product: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
