import axios from 'axios';
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
import api from '../../../config/api';

// Create Order
export const createOrder = (reqData) => async (dispatch) => {

try {
  dispatch({ type: CREATE_ORDER_REQUEST });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${reqData.jwt}`,
    },
  };

    const response = await api.post('/api/orders', reqData.address); // API call

    if (response.data.id) {
      reqData.navigate({ search: `step=3&order_id=${response.data.id}` });
    }

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Fetch Order History
export const fetchOrderHistory = (reqData) => async (dispatch) => {
  dispatch({ type: FETCH_ORDER_HISTORY_REQUEST });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    };
    const response = await api.get('/api/orders/user'); // API call
    dispatch({
      type: FETCH_ORDER_HISTORY_SUCCESS,
      payload: response.data,     
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_HISTORY_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Fetch Order by ID
export const fetchOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: FETCH_ORDER_BY_ID_REQUEST });
  try {
    const response = await api.get(`/api/orders/${orderId}`); // API call
    dispatch({
      type: FETCH_ORDER_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_BY_ID_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
