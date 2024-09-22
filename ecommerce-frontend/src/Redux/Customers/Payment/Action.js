import axios from 'axios';
import {
  CREATE_PAYMENT_LINK_REQUEST,
  CREATE_PAYMENT_LINK_SUCCESS,
  CREATE_PAYMENT_LINK_FAILURE,
  UPDATE_PAYMENT_INFORMATION_REQUEST,
  UPDATE_PAYMENT_INFORMATION_SUCCESS,
  UPDATE_PAYMENT_INFORMATION_FAILURE,
} from './ActionType';
import api from '../../../config/api';

// Action to create a payment link
export const createPaymentLink = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_LINK_REQUEST });
  try {
    const { data } = await api.post(`/api/payments/${orderId}`);
    if(data.payment_link_url){
        window.location.href=data.payment_link_url;
      }
    dispatch({ type: CREATE_PAYMENT_LINK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_LINK_FAILURE,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};

// Action to update payment information
export const updatePaymentInformation = (paymentData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_INFORMATION_REQUEST });
  try {
    const { data } = await api.get('/api/payments', { params: paymentData });
    dispatch({ type: UPDATE_PAYMENT_INFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_INFORMATION_FAILURE,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
