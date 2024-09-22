// src/store/cart/reducer.js

import {
    FETCH_CART_REQUEST,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILURE,
    EMPTY_CART_REQUEST,
    EMPTY_CART_SUCCESS,
    EMPTY_CART_FAILURE,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
  } from './ActionType';
  
  const initialState = {
    cart: null,
    loading: false,
    error: null,
    updateSuccess: false,
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CART_REQUEST:
      case EMPTY_CART_REQUEST:
      case ADD_ITEM_REQUEST:
      case UPDATE_CART_ITEM_REQUEST:
      case REMOVE_CART_ITEM_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case FETCH_CART_SUCCESS:
      case ADD_ITEM_SUCCESS:
      case UPDATE_CART_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          cart: action.payload,
          updateSuccess: true,
        };
      

      case REMOVE_CART_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          cart: {
            ...state.cart,
            cartItems: state.cart.cartItems.filter(item => item.id !== action.payload.id),
          },
        };

        case EMPTY_CART_SUCCESS:
        return {
          ...state,
          loading: false,
          cart: {
            ...state.cart,
            cartItems: [],
          },
        };
  
      case FETCH_CART_FAILURE:
      case ADD_ITEM_FAILURE:
      case UPDATE_CART_ITEM_FAILURE:
      case REMOVE_CART_ITEM_FAILURE:
      case EMPTY_CART_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  