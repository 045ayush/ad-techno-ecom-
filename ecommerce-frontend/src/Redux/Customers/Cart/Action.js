// src/store/cart/actions.js

import axios from 'axios';
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
  REMOVE_CART_ITEM_FAILURE
} from './ActionType';
import api from '../../../config/api';

// Fetch user's cart
export const fetchCart = () => async (dispatch) => {
  dispatch({ type: FETCH_CART_REQUEST });
  
  try {
    const response = await api.get('/api/cart');
    dispatch({ type: FETCH_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
  }
};

// Empty user's cart
export const emptyCart = () => async (dispatch) => {
  dispatch({ type: EMPTY_CART_REQUEST });
  
  try {
    const response = await api.delete('/api/cart');
    dispatch({ type: EMPTY_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: EMPTY_CART_FAILURE, payload: error.message });
  }
};


// Add item to cart
export const addItemToCart = (item) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_REQUEST });
  
  try {
    const response = await api.put('/api/cart/add', item);
    dispatch({ type: ADD_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_ITEM_FAILURE, payload: error.message });
  }
};

// Update cart item with optimistic update
export const updateCartItem = (cartItemId, updatedData) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });

  // Optimistically update the cart state
  const { cart } = getState().cart;
  const updatedCartItems = cart.cartItems.map((item) =>
    item.id === cartItemId ? { ...item, ...updatedData } : item
  );
  
  dispatch({
    type: UPDATE_CART_ITEM_SUCCESS,
    payload: { ...cart, cartItems: updatedCartItems },
  });

  try {
    // Send the update to the server
    const response = await api.put(`/api/cart_items/${cartItemId}`, updatedData);
    // Optionally re-fetch the cart to ensure consistency
    dispatch(fetchCart());
  } catch (error) {
    // Handle failure scenario, revert changes if needed
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};

// Remove cart item
export const removeCartItem = (cartItemId) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });

  const { cart } = getState().cart;
  const updatedCartItems = cart.cartItems.filter(item => item.id !== cartItemId);

  // Optimistically update cart state
  dispatch({
    type: REMOVE_CART_ITEM_SUCCESS,
    payload: { ...cart, cartItems: updatedCartItems },
  });

  try {
    await api.delete(`/api/cart_items/${cartItemId}`);
    dispatch(fetchCart());
  } catch (error) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
  }
};
