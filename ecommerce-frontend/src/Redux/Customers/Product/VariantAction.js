import axios from 'axios';
import {
  DELETE_VARIANT_FAILURE,
  DELETE_VARIANT_SUCCESS,
  DELETE_VARIANT_REQUEST
} from './ActionType';
import api from '../../../config/api';

export const deleteVariant = (variantId) => async (dispatch) => {
    dispatch({ type: DELETE_VARIANT_REQUEST });
    try {
        console.log(variantId);
        
      const response = await api.delete(`/api/admin/variants/${variantId}`);
      dispatch({ type: DELETE_VARIANT_SUCCESS, payload: response.data });
      console.log(response.data);
      
    } catch (error) {
      dispatch({ type: DELETE_VARIANT_FAILURE, payload: error.message });
      console.log(error.message);
      
    }
  };
  