; // adjust the path as per your project structure

import api from '../../../config/api';
import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from './ActionType';

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST });

    const { data } = await api.get('/api/category');

    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getCategoryById = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_BY_ID_REQUEST });

    const { data } = await api.get(`/api/categories/${categoryId}`);

    dispatch({
      type: GET_CATEGORY_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_BY_ID_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const createCategory = (categoryData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    const { data } = await api.post('/api/categories', categoryData);

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateCategory = (categoryId, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const { data } = await api.put(`/api/categories/${categoryId}`, categoryData);

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    await api.delete(`/api/categories/${categoryId}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: categoryId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};
