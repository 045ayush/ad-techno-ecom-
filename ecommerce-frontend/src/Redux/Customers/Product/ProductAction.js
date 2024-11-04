// productActions.js
import axios from 'axios';
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
import api from '../../../config/api';

export const fetchProducts = (query="") => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await api.get(`/api/products?${query}`);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const fetchProductsDetails = (query="") => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_DETAILS_REQUEST });
  try {
    const response = await api.get(`/api/products/details?${query}`);
    dispatch({ type: FETCH_PRODUCTS_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_DETAILS_FAILURE, payload: error.message });
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  try {
    const response = await api.get(`/api/products/${id}`);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message });
  }
};


