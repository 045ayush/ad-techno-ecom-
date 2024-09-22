import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_USER_REQUEST_ID,
  GET_USER_SUCCESS_ID,
  GET_USER_FAILURE_ID,
  LOGOUT,
} from "./ActionTypes";

const initialState = {
  users:null,
  user: null,
  auth_Loading: false,
  auth_error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, auth_Loading: true, auth_error: null };
    case LOGIN_REQUEST:
      return { ...state, auth_Loading: true, auth_error: null };
    case REGISTER_SUCCESS:
      return { ...state, auth_Loading: false };
    case REGISTER_FAILURE:
      return { ...state, auth_Loading: false, auth_error: action.payload };
    case LOGIN_FAILURE:
      return { ...state, auth_Loading: false, auth_error: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, auth_Loading: false };
      case GET_USER_REQUEST:
      case GET_USER_REQUEST_ID:
      case GET_ALL_USER_REQUEST:
      return { ...state, auth_Loading: true, auth_error: null };
      case GET_USER_SUCCESS:
      case GET_USER_SUCCESS_ID:
        return { ...state, auth_Loading: false, user: action.payload };
      case GET_ALL_USER_SUCCESS:
          return { ...state, auth_Loading: false, users: action.payload };
      case GET_USER_FAILURE:
        localStorage.removeItem("jwt");
        return { ...state, auth_Loading: false, auth_error: action.payload };
      case GET_ALL_USER_FAILURE:
      case GET_USER_FAILURE_ID:
        return { ...state, auth_Loading: false, auth_error: action.payload };
      case LOGOUT:
        localStorage.removeItem("jwt");
        return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
