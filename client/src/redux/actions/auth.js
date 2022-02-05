import api from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";
import moment from "moment";

import {
  getTimelineDatesCaptured,
  getTimelineEvent
} from './timeline'

import {
  getAvgDurationOfTuusPerDay,
  getAvgDurationOfTuus,
  getTotalNumberOfTuus,
  getNumberOfTuusPerDay,
  getLiveStreak,
} from "./metrics";

import { getSoundStatus, getReminderStatus } from "./settings";

import {
  // Snackbar
  SUCCESS_200,
  ERROR_SNACKBAR,
  SNACKBAR_RESET,
  ERROR_AUTH_SNACKBAR,
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
} from "./types";

// Send Security Code 
export const checkSecurityCode =
  (securityCode, email) => async (dispatch) => {
    const value = {};

    const body = JSON.stringify({ securityCode, email });

    try {
      dispatch({
        type: SECURITY_CODE_CHECK_LOADING,
      });

      const res = await api.post("/auth/check-security-code", body);

      dispatch({
        type: SECURITY_CODE_CHECK_SUCCESS,
      });

      value.message = "Security Code Validated";
      value.type = "success";

      dispatch({
        type: SUCCESS_200,
        payload: value,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } catch (error) {
      if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: SECURITY_CODE_CHECK_LOADING_COMPLETE,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 400) {
        value.message = error.response.data.errors[0].msg;
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: SECURITY_CODE_CHECK_LOADING_COMPLETE,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 401) {
        value.message = "Your session has expired. Please login again.";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: SECURITY_CODE_CHECK_LOADING_COMPLETE,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else {
        value.message = "Oops! Looks like something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: SECURITY_CODE_CHECK_LOADING_COMPLETE,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      }
    }
  };

// Send Security Code 
export const sendSecurityCode = (email) => async (dispatch) => {
  const value = {};

  const body = JSON.stringify({ email });

  try {
    dispatch({
      type: SECURITY_CODE_LOADING,
      payload: email
    });

    const res = await api.post("/auth/send-security-code", body);

    dispatch({
      type: SECURITY_CODE_SUCCESS,
    });

    value.message = "Reset code sent";
    value.type = "success";

    dispatch({
      type: SUCCESS_200,
      payload: value,
    });

    setTimeout(
      () =>
        dispatch({
          type: SNACKBAR_RESET,
        }),
      5000
    );

  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: SECURITY_CODE_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: SECURITY_CODE_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: SECURITY_CODE_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: SECURITY_CODE_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
}

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await api.get("/auth/get-data");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    let date = new Date()

    dispatch(getTimelineDatesCaptured());
    dispatch(getTimelineEvent(moment(date).toISOString()));
    dispatch(getAvgDurationOfTuusPerDay());
    dispatch(getNumberOfTuusPerDay());
    dispatch(getAvgDurationOfTuus());
    dispatch(getTotalNumberOfTuus());
    dispatch(getLiveStreak());
    dispatch(getSoundStatus());
    dispatch(getReminderStatus());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User kk
export const register =
  ( name, email, password ) =>
  async (dispatch) => {
    const value = {}

    const body = JSON.stringify({ name, email, password });

    try {

      dispatch({
        type: LOGIN_LOADING,
      });

      const res = await api.post("/auth/register", body);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

      dispatch(loadUser());
      
    } catch (error) {
     if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: REGISTER_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 400) {
        value.message = error.response.data.errors[0].msg;
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: ERROR_AUTH_SNACKBAR,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: REGISTER_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 401) {
        value.message = 'Your session has expired. Please login again.';
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: REGISTER_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else {
        value.message = "Oops! Looks like something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: REGISTER_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      }
    }
  };

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    let value = {
      message: '1',
      type: 'info'
    }
    const body = JSON.stringify({ email, password });

    try {
      dispatch({
        type: LOGIN_LOADING,
      });

      const res = await api.post("/auth/login", body);

      console.log(res);

      dispatch({
        type: LOGIN_LOADING_COMPLETE,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 400) {
        value.message = error.response.data.errors[0].msg;
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: ERROR_AUTH_SNACKBAR,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 401) {
        value.message = 'Your session has expired. Please login again.';
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else {
        value.message = "Oops! Looks like something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      }
      dispatch({
        type: LOGIN_FAIL,
      });

    }
  };

// Logout
export const logout = () => ({ type: LOGOUT });
