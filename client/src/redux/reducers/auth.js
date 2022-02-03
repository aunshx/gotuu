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

  // Sound
  SOUND_OFF,
  SOUND_ON,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  loginLoading: false,
  sound: true
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Sound change
    case SOUND_OFF:
      return {
        ...state,
        sound: payload,
      };
    case SOUND_ON:
      return {
        ...state,
        sound: payload,
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
