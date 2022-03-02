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

  // Change Password - Verify Email
  VERIFY_EMAIL_LOADING,
  VERIFY_EMAIL_LOADING_COMPLETE,
  VERIFY_EMAIL,

  // Change Password - Check Security Answers
  CHECK_SECURITY_ANSWERS_LOADING,
  CHECK_SECURITY_ANSWERS_LOADING_COMPLETE,
  CHECK_SECURITY_ANSWERS,

  // Change Password - Finale
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_LOADING_COMPLETE,
  CHANGE_PASSWORD,

  // Set Count Login
  SET_COUNT_LOGIN,

  // Register Set Count
  SET_COUNT_REGISTER,

  // Current Location
  CURRENT_LOCATION,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  loginLoading: false,

  // Change Password - Verify Email
  emailVerified: false,
  emailVerificationLoading: false,
  emailChangePassword: "",
  securityQuestionOne: "",
  securityQuestionTwo: "",
  securityQuestionThree: '',

  // Change Password - Check Security Answers 
  checkSecurityAnswersLoading: false,
  securityAnswersVerified: false,

  // Change Password - Final 
  changePasswordLoading: false,
  changePasswordSuccess: false,

  // Set Count Login 
  count: 0,

  // Set Register Count
  registerCount: 0,

  // Current Location 
  location: ''
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Set current location 
    case CURRENT_LOCATION:
      return {
        ...state,
        location: payload
      }
    // CHANGE PASSWORD

    // Set Count Register
    case SET_COUNT_REGISTER:
      return {
        ...state,
        registerCount: payload,
      };

    // Set Count Login
    case SET_COUNT_LOGIN:
      return {
        ...state,
        count: payload,
      };

    // Verify Email - Step 3 - ChangePassword.js
    case CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        changePasswordLoading: true,
      };
    case CHANGE_PASSWORD_LOADING_COMPLETE:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: false,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordSuccess: true,
      };

    // Verify Email - Step 2 - CheckQuestions.js
    case CHECK_SECURITY_ANSWERS_LOADING:
      return {
        ...state,
        checkSecurityAnswersLoading: true,
      };
    case CHECK_SECURITY_ANSWERS_LOADING_COMPLETE:
      return {
        ...state,
        checkSecurityAnswersLoading: false,
        securityAnswersVerified: false,
      };
    case CHECK_SECURITY_ANSWERS:
      return {
        ...state,
        securityAnswersVerified: true,
      };

    // Verify Email - Step 1 - CheckEmail.js
    case VERIFY_EMAIL_LOADING:
      return {
        ...state,
        emailVerificationLoading: true,
      };
    case VERIFY_EMAIL_LOADING_COMPLETE:
      return {
        ...state,
        emailVerificationLoading: false,
        emailChangePassword: "",
        securityQuestionOne: "",
        securityQuestionTwo: "",
        securityQuestionThree: "",
        emailVerified: false,
      };
    case VERIFY_EMAIL:
      return {
        ...state,
        emailVerified: true,
        emailChangePassword: payload.email,
        securityQuestionOne: payload.details.securityQuestionOne,
        securityQuestionTwo: payload.details.securityQuestionTwo,
        securityQuestionThree: payload.details.securityQuestionThree,
        emailVerificationLoading: false,
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
