import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,

  // Loading
  LOGIN_LOADING,
  LOGIN_LOADING_COMPLETE,

  // Forgot Password
  SECURITY_CODE_LOADING,
  SECURITY_CODE_LOADING_COMPLETE,
  SECURITY_CODE_SUCCESS,

  // Security Code Check
  SECURITY_CODE_CHECK_LOADING,
  SECURITY_CODE_CHECK_LOADING_COMPLETE,
  SECURITY_CODE_CHECK_SUCCESS,

  // Password Change
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_COMPLETE,
  PASSWORD_CHANGE_LOADING,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  loginLoading: false,

  // Forgot Password
  securityCodeLoading: false,
  securityCodeSuccess: false,
  securityCodeCheckSuccess: false,
  securityCodeCheckLoading: false,
  forgotPasswordEmail: '',
  forgotPasswordLoading: false,
  forgotPasswordChange: false
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Password Change
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        forgotPasswordChange: true,
      };

    case PASSWORD_CHANGE_LOADING:
      return {
        ...state,
        forgotPasswordLoading: false,
      };

    case PASSWORD_CHANGE_COMPLETE:
      return {
        ...state,
        forgotPasswordChange: false,
        forgotPasswordLoading: false,
      };
    // Security Code
    case SECURITY_CODE_CHECK_SUCCESS:
      return {
        ...state,
        securityCodeCheckSuccess: true,
      };

    case SECURITY_CODE_CHECK_LOADING:
      return {
        ...state,
        securityCodeCheckLoading: true,
      };

    case SECURITY_CODE_CHECK_LOADING_COMPLETE:
      return {
        ...state,
        securityCodeCheckLoading: false,
        securityCodeCheckSuccess: false,
      };

    // Security Code
    case SECURITY_CODE_SUCCESS:
      return {
        ...state,
        securityCodeSuccess: true,
      };

    case SECURITY_CODE_LOADING:
      return {
        ...state,
        securityCodeLoading: true,
        forgotPasswordEmail: payload,
      };

    case SECURITY_CODE_LOADING_COMPLETE:
      return {
        ...state,
        securityCodeLoading: false,
        securityCodeSuccess: false,
        forgotPasswordEmail: "",
      };

    // Login Loading
    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
      };
    case LOGIN_LOADING_COMPLETE:
      return {
        ...state,
        loginLoading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
