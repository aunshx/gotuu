import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FORGOT_PASSWORD_LINK_SENT,
  FORGOT_PASSWORD_LINK_RECEIVED,
  FORGOT_PASSWORD_LINK_RESET,
  SUBMIT_RESET_PASSWORD_TRUE,
  SUBMIT_RESET_PASSWORD_FALSE,
  SUBMIT_BUTTON_REST_PASSWORD_FALSE,
  SUBMIT_BUTTON_COMPLETE_RESET,
  SUBMIT_BUTTON_ERROR_INVALID_SECURITY_CODE,
  SUBMIT_BUTTON_ERROR_VALID_SECURITY_CODE,
  LOGIN_LOADING,
  LOGIN_LOADING_COMPLETE,
  LOGIN_LOADING_ERROR_RESOLVED,
  LOGIN_LOADING_ERROR,

} from "../actions/types";
//
const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
  loadingInternalForgotPassword: false,
  loadingCompleteCheckForgotPassword: false,
  loadingResetPassword: false,
  loadingCompleteResetPassword: false,
  submitInvalidSecurityCodeError: false,
  loginLoading: false,
  loginError: false,
};
// kk
function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

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
    case LOGIN_LOADING_ERROR:
      return {
        ...state,
        loginError: true,
      };
    case LOGIN_LOADING_ERROR_RESOLVED:
      return {
        ...state,
        loginError: false,
      };
    case SUBMIT_RESET_PASSWORD_TRUE:
      return {
        ...state,
        loadingResetPassword: true,
      };

    case SUBMIT_RESET_PASSWORD_FALSE:
      return {
        ...state,
        loadingResetPassword: false,
        loadingCompleteResetPassword: true,
      };

    case SUBMIT_BUTTON_REST_PASSWORD_FALSE:
      return {
        ...state,
        loadingCompleteResetPassword: false,
      };

    case SUBMIT_BUTTON_COMPLETE_RESET:
      return {
        ...state,
        loadingResetPassword: false,
        loadingCompleteResetPassword: false,
      };

    case SUBMIT_BUTTON_ERROR_INVALID_SECURITY_CODE:
      return {
        ...state,
        submitInvalidSecurityCodeError: true,
      };

    case SUBMIT_BUTTON_ERROR_VALID_SECURITY_CODE:
      return {
        ...state,
        submitInvalidSecurityCodeError: false,
      };

    case FORGOT_PASSWORD_LINK_SENT:
      return {
        ...state,
        loadingInternalForgotPassword: true,
      };
    case FORGOT_PASSWORD_LINK_RECEIVED:
      return {
        ...state,
        loadingInternalForgotPassword: false,
        loadingCompleteCheckForgotPassword: true,
      };
    //   ...
    case FORGOT_PASSWORD_LINK_RESET:
      return {
        ...state,
        loadingInternalForgotPassword: false,
        loadingCompleteCheckForgotPassword: false,
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
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
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
